// src/lib/auth.ts
import { betterAuth } from 'better-auth';
import Database from 'better-sqlite3';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
    emailAndPassword: { enabled: true },
    database: new Database('database.sqlite'),
    plugins: [nextCookies()],
});
