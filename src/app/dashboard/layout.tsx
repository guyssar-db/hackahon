import LayoutAdmin from '@/layouts/LayoutAdmin';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <LayoutAdmin>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="lg:col-span-3">{children}</div>
                </div>
            </LayoutAdmin>
        </div>
    );
}
