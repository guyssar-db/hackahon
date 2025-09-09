'use client'
import Image from 'next/image';
import { LoginSchema } from '@/lib/schemas/auth.schema';
import { authClient } from '@/lib/auth-client';

export default function SignInPage() {

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };
        const parsed = LoginSchema.parse(data);
        await authClient.signIn.email(
            {
                email: parsed.email,
                password: parsed.password,
                callbackURL: '/dashboard',
            },
            {
                onError: (ctx) => {
                    if (ctx.error.status === 403) {
                        alert('Please verify your email address');
                    }
                    alert(ctx.error.message);
                },
            },
        );
    };

    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-900">
        <body class="h-full">
        ```
      */}
            <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gray-900">
                <div className="w-full max-w-sm space-y-10">
                    <div className="relative">
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                            Sign in to your account
                        </h2>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div>
                            <div className="col-span-2">
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email address"
                                    autoComplete="email"
                                    aria-label="Email address"
                                    className="block w-full rounded-t-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-700 placeholder:text-gray-500 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    defaultValue={'admin@example.com'}
                                />
                            </div>
                            <div className="-mt-px">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    aria-label="Password"
                                    className="block w-full rounded-b-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-700 placeholder:text-gray-500 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    defaultValue={'secretpw'}
                                />
                            </div>
                        </div>

                       

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    
                </div>
            </div>
        </>
    );
}
