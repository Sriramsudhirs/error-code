import { createHash } from 'crypto';

export function generateSecureToken(length: number = 32): string {
  return createHash('sha256')
    .update(Math.random().toString())
    .digest('hex')
    .slice(0, length);
}

export function validateAdminToken(token: string): boolean {
  return token === process.env.ADMIN_TOKEN;
}

export function getAdminPath(): string {
  return `/admin/${process.env.ADMIN_TOKEN}`;
}