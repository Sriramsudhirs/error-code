"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAdminStore } from '@/lib/stores/adminStore';

export function useAuth() {
  const router = useRouter();
  const { setUser, logout } = useAdminStore();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/admin/login');
        return;
      }

      const { data: profile } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!profile) {
        await supabase.auth.signOut();
        router.push('/admin/login');
        return;
      }

      setUser({ ...session.user, ...profile });
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        logout();
        router.push('/admin/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { logout };
}