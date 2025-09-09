'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    TransitionChild,
} from '@headlessui/react';
import {
    Bars3Icon,
    XMarkIcon,
    HomeIcon,
    UsersIcon,
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    CogIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    ArrowTurnLeftDownIcon,
    ArrowUturnLeftIcon,
    BackwardIcon,
} from '@heroicons/react/24/solid';

const navigation = [
    { name: 'Overview', href: '/dashboard', icon: HomeIcon, current: true },
    {
        name: 'User Management',
        href: '/dashboard/user',
        icon: UsersIcon,
        current: false,
    },
    {
        name: 'Booking',
        href: '/dashboard/booking',
        icon: CalendarIcon,
        current: false,
    },
    {
        name: 'Events',
        href: '/dashboard/event',
        icon: ChartPieIcon,
        current: false,
    },
    {
        name: 'Trickets',
        href: '/dashboard/',
        icon: DocumentDuplicateIcon,
        current: false,
    },
    { name: 'Feedback', href: '#', icon: FolderIcon, current: false },
    { name: 'Accounts Setting', href: '#', icon: CogIcon, current: false },
    { name: 'Back', href: '/', icon: ArrowUturnLeftIcon, current: false },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function AdminNavbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Mobile sidebar */}
            <Dialog
                open={sidebarOpen}
                onClose={setSidebarOpen}
                className="relative z-50 lg:hidden"
            >
                <DialogBackdrop className="fixed inset-0 bg-gray-900/80" />
                <div className="fixed inset-0 flex">
                    <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out">
                        <TransitionChild>
                            <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
                                <button
                                    type="button"
                                    onClick={() => setSidebarOpen(false)}
                                    className="-m-2.5 p-2.5"
                                >
                                    <span className="sr-only">
                                        Close sidebar
                                    </span>
                                    <XMarkIcon
                                        aria-hidden="true"
                                        className="size-6 text-white"
                                    />
                                </button>
                            </div>
                        </TransitionChild>

                        <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2">
                            <nav className="flex flex-1 flex-col">
                                <ul
                                    role="list"
                                    className="flex flex-1 flex-col gap-y-3 pt-20"
                                >
                                    {navigation.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        isActive
                                                            ? 'bg-white/5 text-white'
                                                            : 'text-gray-400 hover:bg-white/5 hover:text-white',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                    )}
                                                >
                                                    <item.icon
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            isActive
                                                                ? 'text-white'
                                                                : 'text-gray-400 group-hover:text-white',
                                                            'size-6 shrink-0',
                                                        )}
                                                    />
                                                    {item.name}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Desktop sidebar */}
            <div className="hidden bg-gray-900 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-white/10 bg-black/10 px-6">
                    <nav className="flex flex-1 flex-col">
                        <ul
                            role="list"
                            className="flex flex-1 flex-col gap-y-3 pt-20"
                        >
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;

                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={classNames(
                                                isActive
                                                    ? 'bg-white/5 text-white'
                                                    : 'text-gray-400 hover:bg-white/5 hover:text-white',
                                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                            )}
                                        >
                                            <item.icon
                                                aria-hidden="true"
                                                className={classNames(
                                                    isActive
                                                        ? 'text-white'
                                                        : 'text-gray-400 group-hover:text-white',
                                                    'size-6 shrink-0',
                                                )}
                                            />
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Mobile top bar */}
            <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 sm:px-6 lg:hidden">
                <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    className="-m-2.5 p-2.5 text-gray-400 hover:text-white lg:hidden"
                >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
                <div className="flex-1 text-sm/6 font-semibold text-white">
                    Dashboard
                </div>
            </div>
        </>
    );
}
