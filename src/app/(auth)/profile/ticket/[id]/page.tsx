'use client';

import LayoutMain from '@/layouts/LayoutMain';
import { useParams } from 'next/navigation';

export default function TicketPage() {
    const { id } = useParams();

    // Mock ticket data
    const ticket = {
        id,
        title: 'Digital Marketing Masterclass 2025',
        date: '15-17 ต.ค. 2025',
        status: 'ยังไม่จ่าย',
    };

    return (
        <LayoutMain>
            <div className="max-w-2xl mx-auto p-4 my-25 space-y-4">
                <h1 className="text-2xl font-bold">{ticket.title}</h1>
                <p>
                    <span className="font-semibold">วันที่:</span> {ticket.date}
                </p>
                <p>
                    <span className="font-semibold">สถานะ:</span>{' '}
                    {ticket.status}
                </p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    ไปที่หน้าตั๋ว
                </button>
            </div>
        </LayoutMain>
    );
}
