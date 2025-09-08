import Link from 'next/link';

type User = { id: string; name: string };

export default async function UsersList() {
    const users: User[] = [
        { id: '101', name: 'Alice' },
        { id: '102', name: 'Bob' },
        { id: '103', name: 'Carol' },
    ];

    return (
        <div>
            <h1 className="mb-4 text-xl font-semibold">Users</h1>
            <ul className="space-y-2">
                {users.map((u) => (
                    <li key={u.id}>{u.name}</li>
                ))}
            </ul>
        </div>


    );
}
