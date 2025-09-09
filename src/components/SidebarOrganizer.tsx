import Link from 'next/link';
import React from 'react';

export default function SidebarOrganizer() {
    return (
        <div className="flex min-h-screen bg-gray-100 pt-16">
            <aside className="w-64 bg-white shadow-md">
                <nav className="mt-8">
                    <Link
                        href="/organizer/dashboard/newpostevents"
                        className="block py-3 px-6 text-gray-700 hover:bg-purple-100"
                    >
                        New Post Events
                    </Link>
                    <Link
                        href="/organizer/dashboard/historypostevents"
                        className="block py-3 px-6 text-gray-700 hover:bg-purple-100"
                    >
                        History Post Events
                    </Link>
                    <Link
                        href="/organizer/dashboard/accountsetting"
                        className="block py-3 px-6 text-gray-700 hover:bg-purple-100"
                    >
                        Accounts Setting
                    </Link>
                </nav>
            </aside>
        </div>
    );
}
