'use client';

import { authClient } from '@/lib/auth-client';

export default function AuthButtons() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) return <button disabled>Loading...</button>;

    if (session) {
        return (
            <div className="flex gap-3">
                <span>Hello, {session.user.email}</span>
                <button onClick={() => authClient.signOut()}>Sign out</button>

                {/* ปุ่มนี้ใช้ได้ก็ต่อเมื่อเราล็อกอินเป็น admin แล้ว */}
                <button
                    onClick={async () => {
                        await authClient.admin.createUser({
                            email: 'org1@example.com',
                            password: 'secretpw',
                            name: 'Organizer 1',
                            role: 'organize', // ใส่ได้ที่ admin API (ไม่ใช่ signUp)
                        });
                    }}
                >
                    (Admin) Create organize
                </button>
            </div>
        );
    }

    return (
        <div className="flex gap-3">
            <button
                onClick={() =>
                    authClient.admin.createUser({
                        email: 'admin@example.com',
                        password: 'secretpw',
                        name: 'Admin',
                        role: 'admin', // ใส่ได้ที่ admin API (ไม่ใช่ signUp)
                    })
                }
            >
                Sign up (admin@example.com)
            </button>

            <button
                onClick={() =>
                    authClient.signIn.email({
                        email: 'admin@example.com',
                        password: 'secretpw',
                    })
                }
            >
                Sign in
            </button>
        </div>
    );
}
