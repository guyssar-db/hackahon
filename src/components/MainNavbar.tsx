'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function MainNavbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const { data, isPending, error, refetch } = authClient.useSession();
    const [loading, setLoading] = useState(false);

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

    console.log(data?.user);

   
    const signInSubmit = async () => {
        try {
            setLoading(true);
            await authClient.signIn.email({
                email: 'admin@example.com',
                password: 'secretpw',
            });
            router.push('/');
        } catch (err) {
            console.error(err);
            alert('Sign in failed');
        } finally {
            setLoading(false);
        }
    };
    const signUpSubmit = async () => {
        try {
            await authClient.signUp.email({
                email: 'user3@example.com',
                name: 'user3',
                password: 'secretpw',
            });

            router.push('/');
        } catch (err) {
            console.error(err);
            alert('Sign Up failed');
        } finally {
            setLoading(false);
        }
    };

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
        { name: 'Ticket', href: '/tickets' },
    ];
    const navItemsMobile = [
        {
            name: 'Ticket',
            href: '/tickets',
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
            <nav className="fixed w-full flex justify-between items-center gap-6 p-4 px-4 bg-linear-to-r from-cyan-500 to-blue-600 h-[65px] duration-300 ease-in-out z-10 drop-shadow-lg">
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
                        name="dark-light"
                        onClick={toggleTheme}
                        className="ml-4 px-3 py-1 rounded-2xl border border-gray-400  
                     bg-white  text-gray-800  
                     hover:bg-gray-200 transition duration-300 ease-in-out"
                    >
                        {theme === 'dark' ? '🌙' : '☀️'}
                    </button>
                    <Menu as="div" className="relative inline-block">
                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
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
                            <ChevronDownIcon
                                aria-hidden="true"
                                className="-mr-1 size-5 text-gray-400"
                            />
                        </MenuButton>

                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-white/10 rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                            {data?.user ? (
                                <>
                                    <div className="px-4 py-3">
                                        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

                                        <p className="text-sm text-gray-400">
                                            Signed in as
                                        </p>
                                        <p className="truncate text-sm font-medium text-white">
                                            {data?.user.email}
                                        </p>
                                    </div>

                                    <div className="py-1">
                                        <MenuItem>
                                            <a
                                                href="/dashboard"
                                                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
                                            >
                                                Dashboard
                                            </a>
                                        </MenuItem>
                                    </div>
                                    <div className="py-1">
                                        <form action="#" method="POST">
                                            <MenuItem>
                                                <button
                                                    type="submit"
                                                    className="block w-full px-4 py-2 text-left text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
                                                    onClick={() =>
                                                        authClient.signOut()
                                                    }
                                                >
                                                    Sign out
                                                </button>
                                            </MenuItem>
                                        </form>
                                    </div>
                                </>
                            ) : (
                                <div className="py-1">
                                    <MenuItem>
                                        <button
                                            onClick={signInSubmit}
                                            disabled={loading}
                                            className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                                        >
                                            {loading
                                                ? 'Signing in…'
                                                : 'Sign in'}
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button
                                            onClick={signUpSubmit}
                                            className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                                        >
                                            {loading
                                                ? 'SignUp…'
                                                : 'Sign Up'}
                                        </button>
                                    </MenuItem>
                                </div>
                            )}
                        </MenuItems>
                    </Menu>
                </div>
                <button
                    name="dark-light"
                    onClick={toggleTheme}
                    className="ml-4 px-3 py-1 rounded-2xl border border-gray-400  
                     bg-white  text-gray-800  
                     hover:bg-gray-200 transition duration-300 ease-in-out flex sm:hidden"
                >
                    {theme === 'dark' ? '🌙' : '☀️'}
                </button>
            </nav>

            <nav className="fixed flex sm:hidden h-[85px] bottom-0 w-full bg-linear-to-r from-cyan-500 to-blue-600 drop-shadow-2xl duration-300 ease-in-out z-40">
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
                                    height={30}
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
