// /profile/ProfilePageClient.tsx
'use client';

import Link from 'next/link';
import LayoutMain from '@/layouts/LayoutMain';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

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

export default function ProfilePageClient() {
    const qs = useSearchParams();
    const router = useRouter();

    const [tab, setTabState] = useState<'info' | 'orders'>('info');
    const [status, setStatus] = useState<OrderStatus | null>(null);

    useEffect(() => {
        // Read query params AFTER mount
        const t = qs.get('tab') === 'orders' ? 'orders' : 'info';
        setTab(t);

        const s = qs.get('status');
        setStatus(s === 'paid' || s === 'pending' ? s : null);
    }, [qs]);

    // MOCK data (same as your original)
    const user: { name?: string; email?: string; orders: Order[] } = {
        name: 'Demo User',
        email: 'demo@example.com',
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
        ],
    };

    // update URL
    const setTab = (next: 'info' | 'orders') => {
        const nextUrl = `${window.location.pathname}?tab=${next}${
            status ? `&status=${status}` : ''
        }`;
        router.replace(nextUrl, { scroll: false });
        setTabState(next);
    };

    const toggleStatus = (s: OrderStatus) => {
        const nextStatus = status === s ? '' : s;
        setStatus(nextStatus === '' ? null : nextStatus);
        router.replace(
            `${window.location.pathname}?tab=orders${nextStatus ? `&status=${nextStatus}` : ''}`,
            { scroll: false },
        );
    };

    return (
        <LayoutMain>
            <div className="bg-gray-100 min-h-[calc(100vh-68px)] flex items-center">
                <div className="w-full max-w-4xl mx-auto p-4 space-y-6 mt-[65px] min-h-[calc(100vh-150px)]">
                    {/* Tabs */}
                    <div className="flex gap-4">
                        <button
                            className={`px-3 py-1 rounded ${
                                tab === 'info'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200'
                            }`}
                            onClick={() => setTab('info')}
                        >
                            ข้อมูลส่วนตัว
                        </button>
                        <button
                            className={`px-3 py-1 rounded ${
                                tab === 'orders'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200'
                            }`}
                            onClick={() => setTab('orders')}
                        >
                            รายการสั่งซื้อ
                        </button>
                    </div>

                    {/* Content */}
                    {tab === 'info' && (
                        <div className="bg-white p-6 rounded shadow space-y-4">
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
                                    className={`px-3 py-1 rounded ${
                                        status === 'pending'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                                >
                                    ยังไม่จ่าย
                                </button>
                                <button
                                    onClick={() => toggleStatus('paid')}
                                    className={`px-3 py-1 rounded ${
                                        status === 'paid'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                                >
                                    จ่ายแล้ว
                                </button>
                            </div>

                            <div className="space-y-2">
                                {user.orders
                                    .filter(
                                        (e) =>
                                            !status ||
                                            e.payment[0].status === status,
                                    )
                                    .map((e) => {
                                        const p = e.payment[0];
                                        return (
                                            <Link
                                                key={e.event_id}
                                                href={`/profile/ticket/${e.event_id}?from=/profile&tab=orders${
                                                    status
                                                        ? `&status=${status}`
                                                        : ''
                                                }`}
                                                className="block"
                                            >
                                                <div className="p-4 bg-white rounded shadow hover:bg-gray-100 cursor-pointer">
                                                    <p className="font-semibold">
                                                        {e.title}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        สถานะ: {p.status}
                                                    </p>
                                                    {p.pricing && (
                                                        <p className="text-sm text-gray-500">
                                                            ราคา: {p.pricing}
                                                        </p>
                                                    )}
                                                    {p.channel && (
                                                        <p className="text-xs text-gray-400">
                                                            ช่องทาง: {p.channel}
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
