'use client';

import { authClient } from '@/lib/auth-client';

export default function AuthButtons() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) return <button disabled>Loading...</button>;
    if (session)
        return <button onClick={() => authClient.signOut()}>Sign out</button>;

    return (
        <div className="flex gap-3">
            <button
                onClick={() =>
                    authClient.signUp.email({
                        email: 'demo@example.com',
                        password: 'secretpw',
                        name: 'Demo',
                    })
                }
            >
                Sign up
            </button>
            <button
                onClick={() =>
                    authClient.signIn.email({
                        email: 'demo@example.com',
                        password: 'secretpw',
                    })
                }
            >
                Sign in
            </button>
        </div>
    );
}
