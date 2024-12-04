-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "postgraphile_watch";

-- Create admin_profiles table with proper constraints
create table if not exists public.admin_profiles (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users(id) on delete cascade,
    email text unique not null,
    role text not null default 'ADMIN',
    last_login timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add indexes for better performance
create index if not exists admin_profiles_user_id_idx on public.admin_profiles(user_id);
create index if not exists admin_profiles_email_idx on public.admin_profiles(email);

-- Enable RLS
alter table public.admin_profiles enable row level security;

-- Create RLS policies
create policy "Admin profiles are viewable by admin users only" 
    on public.admin_profiles for select 
    using (auth.role() = 'authenticated' and exists (
        select 1 from public.admin_profiles where user_id = auth.uid()
    ));

create policy "Admin profiles are insertable by admin users only"
    on public.admin_profiles for insert
    with check (auth.role() = 'authenticated');

-- Create function to handle new admin registration
create or replace function public.handle_new_admin()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.admin_profiles (user_id, email, role)
    values (new.id, new.email, 'ADMIN');
    return new;
end;
$$;

-- Drop existing trigger if exists
drop trigger if exists on_auth_admin_created on auth.users;

-- Create trigger for new admin registration
create trigger on_auth_admin_created
    after insert on auth.users
    for each row
    when (new.email = 'admin@bgremoval.in')
    execute procedure public.handle_new_admin();

-- Insert initial admin user if not exists
do $$
begin
    if not exists (select 1 from auth.users where email = 'admin@bgremoval.in') then
        insert into auth.users (
            email,
            encrypted_password,
            email_confirmed_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at
        ) values (
            'admin@bgremoval.in',
            crypt('admin123', gen_salt('bf')),
            now(),
            '{"provider": "email", "providers": ["email"]}',
            '{"role": "ADMIN"}',
            now(),
            now()
        );
    end if;
end
$$;