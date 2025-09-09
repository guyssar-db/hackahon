'use client';
import { redirect, useParams } from 'next/navigation';
import { useState } from 'react';

interface Props {
    pricing: any;
}

export default function BuyTicketSection({ pricing }: Props) {
    const [selectedPrice, setSelectedPrice] = useState<string>('');
    const { id } = useParams();

    const handlePurchase = () => {
        if (!selectedPrice) return alert('กรุณาเลือกประเภทตั๋วก่อน');
        alert(`เพิ่ม ${selectedPrice} ในตะกร้าสำเร็จ!`);
        redirect(`/profile/ticket/${id}`);
    };

    return (
        <div
            id="buy-ticket"
            className="space-y-4 bg-white dark:bg-gray-700 shadow-md rounded-lg px-4 py-6"
        >
            <h2 className="text-xl font-bold">ซื้อตั๋ว</h2>
            <div className="flex flex-wrap gap-3">
                {Object.entries(pricing).map(([key, value]) => {
                    if (key === 'currency' || Number(value) <= 0) return null;
                    return (
                        <button
                            key={key}
                            onClick={() => setSelectedPrice(key)}
                            className={`px-4 py-2 border rounded-lg ${selectedPrice === key ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800/50 dark:text-gray-100 cursor-pointer'}`}
                        >
                            {key} - {value} {pricing.currency}
                        </button>
                    );
                })}
            </div>
            <button
                onClick={handlePurchase}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
            >
                สั่งซื้อ
            </button>
        </div>
    );
}
