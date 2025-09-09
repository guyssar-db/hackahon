'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrganizerNavbar() {
    const pathname = usePathname();
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (theme === 'dark') {
            localStorage.theme = 'light';
            document.documentElement.classList.remove('dark');
            setTheme('light');
        } else {
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark');
            setTheme('dark');
        }
    };

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Tricket', href: '/trickets' },
    ];
    const navItemsMobile = [
        {
            name: 'Tricket',
            href: '/trickets',
            images: 'https://www.svgrepo.com/show/488420/ticket.svg',
        },
        {
            name: 'Home',
            href: '/',
            images: 'https://www.svgrepo.com/show/61237/home-icon-silhouette.svg',
        },
        {
            name: 'Profile',
            href: '/profile',
            images: 'https://www.svgrepo.com/show/491108/profile.svg',
        },
    ];

    return (
        <>
            <nav className="fixed w-full flex justify-between items-center gap-6 p-4 px-8 bg-linear-to-r from-cyan-500 to-blue-600 h-[65px] duration-300 ease-in-out z-10 drop-shadow-lg">
                <Link
                    href="/"
                    className="font-bold text-lg text-white duration-300 ease-in-out"
                >
                    navhome
                </Link>

                {/* Nav Desktop */}
                <div className="hidden sm:flex gap-6 items-center">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`pb-1 transition-colors ${
                                    isActive
                                        ? 'border-b-4 white-500 font-bold text-white pointer-events-none'
                                        : 'text-white hover:border-b-4 duration-300 ease-in-out'
                                }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}

                    <button
                        onClick={toggleTheme}
                        className="ml-4 px-3 py-1 rounded-2xl border border-gray-400  
                     bg-white  text-gray-800  
                     hover:bg-gray-200 transition duration-300 ease-in-out"
                    >
                        {theme === 'dark' ? '🌙' : '☀️'}
                    </button>
                    <button
                        name="profile button"
                        className=" px-2 py-2 rounded-3xl border border-gray-400 bg-white text-gray-800 hover:bg-gray-200 transition duration-300 ease-in-out"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="lucide lucide-user h-5 w-5"
                        >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </button>
                </div>
                <button
                    onClick={toggleTheme}
                    className="ml-4 px-3 py-1 rounded-2xl border border-gray-400  
                     bg-white  text-gray-800  
                     hover:bg-gray-200 transition duration-300 ease-in-out flex sm:hidden"
                >
                    {theme === 'dark' ? '🌙' : '☀️'}
                </button>
            </nav>

            <nav className="fixed flex sm:hidden h-[85px] bottom-0 w-full bg-white dark:bg-linear-to-r from-cyan-500 to-blue-600 drop-shadow-2xl duration-300 ease-in-out">
                {/* nav Mobile */}
                <div className="flex justify-around items-center w-full">
                    {navItemsMobile.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col justify-center items-center pb-1 transition-colors ${
                                    isActive
                                        ? 'border-b-4 white-500 font-bold text-blue-600 dark:text-white pointer-events-none'
                                        : 'text-black dark:text-white hover:border-b-4 duration-300 ease-in-out'
                                }`}
                            >
                                <Image
                                    src={item.images}
                                    alt={item.name}
                                    height={20}
                                    width={30}
                                    className="object-cover dark:filter dark:invert dark:brightness-200 duration-300 ease-in-out"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
