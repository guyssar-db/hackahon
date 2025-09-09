// src/lib/auth.ts
import { betterAuth } from 'better-auth';
import { admin as adminPlugin } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';
import { ac, admin, user, organize } from './helpers/permission';
import Database from 'better-sqlite3';

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: new Database('./data/database.sqlite'),
    plugins: [
        nextCookies(),
        adminPlugin({
            ac,
            roles: { admin, user, organize },
            defaultRole: 'user',
            adminRoles: ['admin'],
        }),
    ],
});
