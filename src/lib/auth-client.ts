// src/lib/auth-client.ts
import { createAuthClient } from 'better-auth/react';
import { adminClient } from 'better-auth/client/plugins';
import { ac, admin, user, organize } from './helpers/permission';

export const authClient = createAuthClient({
    plugins: [
        adminClient({
            ac,
            roles: { admin, user, organize },
        }),
    ],
});
