import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function UsersList() {
    // const users: User[] = [
    //     { id: '101', name: 'Alice' },
    //     { id: '102', name: 'Bob' },
    //     { id: '103', name: 'Carol' },
    // ];

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect('/sign-in'); // ถ้าไม่มี session ให้เด้งไปหน้าเข้าสู่ระบบ

    return (
        <div>
            <h1 className="mb-4 text-xl font-semibold">Users</h1>
            <pre>{JSON.stringify(session.user, null, 2)}</pre>
        </div>
    );
}
