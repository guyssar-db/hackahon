'use client';

import Link from 'next/link';
import LayoutMain from '@/layouts/LayoutMain';
import { authClient } from '@/lib/auth-client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type OrderStatus = 'pending' | 'paid';

type Payment = {
    pricing: string;
    status: OrderStatus;
    created_at: string;
    channel: string;
};

type Order = {
    event_id: string;
    userid: string;
    title: string;
    payment: Payment[];
};

export default function ProfilePage() {
    const router = useRouter();
    const pathname = usePathname();
    const qs = useSearchParams();
    const { data } = authClient.useSession();

    // อ่านค่าจาก URL
    const tab = qs.get('tab') === 'orders' ? 'orders' : 'info';
    const statusParam = qs.get('status');
    const status: OrderStatus | null =
        statusParam === 'paid' || statusParam === 'pending'
            ? statusParam
            : null;

    // เขียนค่าลง URL
    const setTab = (next: 'info' | 'orders') => {
        const nextUrl = `${pathname}?tab=${next}${status ? `&status=${status}` : ''}`;
        router.replace(nextUrl, { scroll: false });
    };
    const toggleStatus = (s: OrderStatus) => {
        const nextStatus = status === s ? '' : `&status=${s}`;
        router.replace(`${pathname}?tab=orders${nextStatus}`, {
            scroll: false,
        });
    };

    // MOCK user + orders (ตามโครง events/payment)
    const user: { name?: string; email?: string; orders: Order[] } = {
        ...data?.user,
        orders: [
            {
                event_id: 'd0c6',
                userid: 'user_001',
                title: 'Digital Marketing Masterclass 2025',
                payment: [
                    {
                        pricing: '2000 THB',
                        status: 'pending',
                        created_at: '2025-09-01T10:00:00Z',
                        channel: 'credit_card',
                    },
                ],
            },
            {
                event_id: 'evt_007',
                userid: 'user_001',
                title: 'Thailand Tech Conference 2025',
                payment: [
                    {
                        pricing: '3500 THB',
                        status: 'paid',
                        created_at: '2025-09-02T15:00:00Z',
                        channel: 'bank_transfer',
                    },
                ],
            },
            {
                event_id: 'evt_008',
                userid: 'user_001',
                title: 'Jazz Under the Stars',
                payment: [
                    {
                        pricing: '3500 THB',
                        status: 'paid',
                        created_at: '2025-12-02T15:00:00Z',
                        channel: 'bank_transfer',
                    },
                ],
            },
        ],
    };

    return (
        <LayoutMain>
            <div className="bg-gray-100 dark:bg-gray-800 min-h-[calc(100vh-68px)] flex items-center">
                <div className="w-full max-w-4xl mx-auto p-4 space-y-6 mt-[65px] min-h-[calc(100vh-150px)]">
                    {/* แท็บ */}
                    <div className="flex gap-4">
                        <button
                            className={`px-3 py-1 rounded ${tab === 'info' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setTab('info')}
                        >
                            ข้อมูลส่วนตัว
                        </button>
                        <button
                            className={`px-3 py-1 rounded ${tab === 'orders' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setTab('orders')}
                        >
                            รายการสั่งซื้อ
                        </button>
                    </div>

                    {tab === 'info' && (
                        <div className="bg-white dark:bg-gray-700 dark:text-white dark:border dark:border-gray-600 p-6 rounded shadow space-y-4">
                            <h2 className="text-xl font-bold">ข้อมูลส่วนตัว</h2>
                            <p>
                                <span className="font-semibold">ชื่อ:</span>{' '}
                                {user?.name ?? '-'}
                            </p>
                            <p>
                                <span className="font-semibold">อีเมล:</span>{' '}
                                {user?.email ?? '-'}
                            </p>
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                                เปลี่ยนรหัสผ่าน
                            </button>
                        </div>
                    )}

                    {tab === 'orders' && (
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => toggleStatus('pending')}
                                    className={`px-3 py-1 rounded ${status === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                >
                                    ยังไม่จ่าย
                                </button>
                                <button
                                    onClick={() => toggleStatus('paid')}
                                    className={`px-3 py-1 rounded ${status === 'paid' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                >
                                    จ่ายแล้ว
                                </button>
                            </div>

                            <div className="space-y-2">
                                {user.orders.map((e) => {
                                    const p = e.payment[0];
                                    if (status && p.status !== status)
                                        return null; // ถ้าไม่ตรง status ก็ข้ามไป

                                    return (
                                        <Link
                                            key={e.event_id}
                                            href={`/profile/ticket/${e.event_id}?from=/profile&tab=orders${status ? `&status=${status}` : ''}`}
                                            className="block"
                                        >
                                            <div className="p-4 bg-white dark:bg-gray-700 dark:text-white dark:border dark:border-gray-600 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                                                <p className="font-semibold">
                                                    {e.title}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-white">
                                                    สถานะ:{' '}
                                                    {p.status === 'pending'
                                                        ? 'ยังไม่จ่าย'
                                                        : 'จ่ายแล้ว'}
                                                </p>
                                                {p.pricing && (
                                                    <p className="text-sm text-gray-500 dark:text-white">
                                                        ราคา: {p.pricing}
                                                    </p>
                                                )}
                                                {p.channel && (
                                                    <p className="text-xs text-gray-400  dark:text-white">
                                                        ช่องทาง: {p.channel}
                                                    </p>
                                                )}
                                                {p.created_at && (
                                                    <p className="text-xs text-gray-400 dark:text-white">
                                                        สร้างเมื่อ:{' '}
                                                        {new Date(
                                                            p.created_at,
                                                        ).toLocaleDateString(
                                                            'th-TH-u-ca-gregory',
                                                            {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                timeZone:
                                                                    'Asia/Bangkok',
                                                            },
                                                        )}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </LayoutMain>
    );
}
