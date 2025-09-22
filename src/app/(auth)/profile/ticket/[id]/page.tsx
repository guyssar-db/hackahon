'use client';

import { useEffect, useState } from 'react';
import LayoutMain from '@/layouts/LayoutMain';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

type OrderStatus = 'pending' | 'paid';

type Payment = {
    pricing: string;
    status: OrderStatus;
    created_at: string;
    channel: string;
};

type Order = {
    event_id: string;
    title: string;
    payment: Payment[];
    dateLabel: string;
};

const MOCK_ORDERS: Order[] = [
    {
        event_id: 'd0c6',
        title: 'Digital Marketing Masterclass 2025',
        payment: [
            {
                pricing: '2000 THB',
                status: 'pending',
                created_at: '2025-09-01T10:00:00Z',
                channel: 'credit_card',
            },
        ],
        dateLabel: '15-17 ต.ค. 2025',
    },
    {
        event_id: 'evt_007',
        title: 'Thailand Tech Conference 2025',
        payment: [
            {
                pricing: '3500 THB',
                status: 'paid',
                created_at: '2025-09-02T15:00:00Z',
                channel: 'bank_transfer',
            },
        ],
        dateLabel: '5-7 พ.ย. 2025',
    },
    {
        event_id: 'evt_008',
        title: 'Jazz Under the Stars',
        payment: [
            {
                pricing: '3500 THB',
                status: 'paid',
                created_at: '2025-12-02T15:00:00Z',
                channel: 'bank_transfer',
            },
        ],
        dateLabel: '12 ธ.ค. 2025',
    },
];

const formatThai = (iso: string) =>
    new Intl.DateTimeFormat('th-TH-u-ca-gregory', {
        dateStyle: 'long',
        timeStyle: 'short',
        timeZone: 'Asia/Bangkok',
    }).format(new Date(iso));

export default function TicketPageClient() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const query = useSearchParams();

    const [ticket, setTicket] = useState<Order | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [tab, setTab] = useState('orders');
    const [from, setFrom] = useState('/profile');

    // initialize client-only state
    useEffect(() => {
        const found =
            MOCK_ORDERS.find((o) => o.event_id === String(id)) || null;
        setTicket(found);

        const fromParam = query.get('from') || '/profile';
        setFrom(fromParam.startsWith('/') ? fromParam : '/profile');

        setTab(query.get('tab') || 'orders');
        setStatusFilter(query.get('status') || '');
    }, [id, query]);

    const goBack = () => {
        if (typeof window === 'undefined') return;

        if (query.has('from')) {
            const url = new URL(from, window.location.origin);
            url.searchParams.set('tab', tab);
            if (statusFilter) url.searchParams.set('status', statusFilter);
            router.push(url.pathname + url.search, { scroll: false });
        } else {
            router.back();
        }
    };

    const pay = () => {
        if (!ticket?.payment[0] || ticket.payment[0].status === 'paid') return;
        alert('จ่ายเงินแล้ว (เดโม่)');
        goBack();
    };

    const cancelOrder = () => {
        if (!ticket?.payment[0] || ticket.payment[0].status === 'paid') return;
        alert('ยกเลิกคำสั่งซื้อแล้ว (เดโม่)');
        goBack();
    };

    const p = ticket?.payment[0];
    const isPaid = p?.status === 'paid';
    const title = ticket?.title ?? String(id);
    const dateText = ticket?.dateLabel ?? '-';
    const statusText = isPaid ? 'จ่ายแล้ว' : 'ยังไม่จ่าย';

    return (
        <LayoutMain>
            <div className="bg-gray-100 min-h-[calc(100vh-65px)] flex items-center">
                <div className="w-full max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow">
                    {/* Title */}
                    <h1 className="text-2xl font-extrabold text-gray-900">
                        {title}
                    </h1>

                    {/* Info */}
                    <div className="space-y-2 text-gray-800">
                        <p>
                            <span className="font-semibold text-gray-700">
                                วันที่:
                            </span>{' '}
                            {dateText}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-700">
                                สถานะ:
                            </span>{' '}
                            <span
                                className={
                                    isPaid
                                        ? 'text-green-600 font-bold'
                                        : 'text-red-600 font-bold'
                                }
                            >
                                {statusText}
                            </span>
                        </p>
                        {p?.pricing && (
                            <p>
                                <span className="font-semibold text-gray-700">
                                    ราคา:
                                </span>{' '}
                                {p.pricing}
                            </p>
                        )}
                        {p?.channel && (
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">ช่องทาง:</span>{' '}
                                {p.channel}
                            </p>
                        )}
                        {p?.created_at && (
                            <p className="text-xs text-gray-500">
                                <span className="font-semibold">
                                    สร้างเมื่อ:
                                </span>{' '}
                                {formatThai(p.created_at)}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={goBack}
                            className="px-4 py-2 text-sm font-medium text-blue-600 hover:underline"
                        >
                            ย้อนกลับ
                        </button>
                        {!isPaid && (
                            <>
                                <button
                                    onClick={pay}
                                    className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    จ่ายเงิน
                                </button>
                                <button
                                    onClick={cancelOrder}
                                    className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    ยกเลิก
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </LayoutMain>
    );
}
