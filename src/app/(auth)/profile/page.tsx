'use client';

import { useState } from 'react';
import Link from 'next/link';
import LayoutMain from '@/layouts/LayoutMain';
import { authClient } from '@/lib/auth-client';

type OrderStatus = 'pending' | 'paid';
type Order = { id: string; title: string; status: OrderStatus };
export default function ProfilePage() {
    const [tab, setTab] = useState<'info' | 'orders'>('info');
    const [statusFilter, setStatusFilter] = useState<OrderStatus | null>(null); // null = ทั้งหมด
    const { data, isPending, error, refetch } = authClient.useSession();

    // toggle filter: ถ้ากดซ้ำที่ปุ่มเดิม → clear filter = แสดงทั้งหมด
    const handleFilterClick = (status: OrderStatus) => {
        setStatusFilter((prev) => (prev === status ? null : status));
    };

    console.log(data?.user);

    // Mock user data
    const user = {
        ...data?.user,
        orders: [
            {
                id: 'evt_001',
                title: 'Digital Marketing Masterclass 2025',
                status: 'pending',
            },
            {
                id: 'evt_002',
                title: 'Thailand Tech Conference 2025',
                status: 'paid',
            },
        ] as Order[],
    };

    const filteredOrders =
        statusFilter === null
            ? user.orders
            : user.orders.filter((o) => o.status === statusFilter);

    return (
        <LayoutMain>
            <div className="max-w-4xl mx-auto p-4 my-25 space-y-6">
                {/* MiniNav */}
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
                    <div className="bg-white p-6 rounded shadow space-y-4">
                        <h2 className="text-xl font-bold">ข้อมูลส่วนตัว</h2>
                        <p>
                            <span className="font-semibold">ชื่อ:</span>{' '}
                            {user.name}
                        </p>
                        <p>
                            <span className="font-semibold">อีเมล:</span>{' '}
                            {user.email}
                        </p>
                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                            เปลี่ยนรหัสผ่าน
                        </button>
                    </div>
                )}

                {tab === 'orders' && (
                    <div className="space-y-4">
                        {/* MiniNav ของ orders */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleFilterClick('pending')}
                                className={`px-3 py-1 rounded ${
                                    statusFilter === 'pending'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                            >
                                ยังไม่จ่าย
                            </button>
                            <button
                                onClick={() => handleFilterClick('paid')}
                                className={`px-3 py-1 rounded ${
                                    statusFilter === 'paid'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                            >
                                จ่ายแล้ว
                            </button>
                        </div>

                        {/* Order List */}
                        <div className="space-y-2">
                            {filteredOrders.length === 0 ? (
                                <div className="p-6 text-center text-gray-500 bg-white rounded shadow">
                                    ยังไม่มีรายการในหมวดนี้นะ ✨
                                </div>
                            ) : (
                                filteredOrders.map((order) => (
                                    <Link
                                        key={order.id}
                                        href={`/profile/ticket/${order.id}`}
                                    >
                                        <div className="p-4 bg-white rounded shadow hover:bg-gray-100 cursor-pointer">
                                            <p className="font-semibold">
                                                {order.title}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                สถานะ:{' '}
                                                {order.status === 'pending'
                                                    ? 'ยังไม่จ่าย'
                                                    : 'จ่ายแล้ว'}
                                            </p>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </LayoutMain>
    );
}
