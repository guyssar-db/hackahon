'use client';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState('admin@example.com');
    const [password, setPassword] = useState('secretpw');
    const [error, setError] = useState<string>();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(undefined);

        const { error } = await authClient.signIn.email({ email, password });
        if (error) setError(error.message);
        else router.push('/dashboard');
    };

    return (
        <form onSubmit={onSubmit} className="p-6 flex flex-col gap-3 max-w-sm">
            <h1 className="text-xl font-semibold">Sign in</h1>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Sign in</button>
        </form>
    );
}
