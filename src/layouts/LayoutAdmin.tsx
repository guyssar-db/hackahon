import AdminNavbar from '@/components/AdminNavbar';

export default function LayoutAdmin({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <AdminNavbar />
            <main className="py-10 lg:pl-72">
                <div className="px-4 sm:px-6 lg:px-8">{children}</div>
            </main>
        </div>
    );
}
