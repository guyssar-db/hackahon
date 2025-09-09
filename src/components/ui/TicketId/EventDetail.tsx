'use client';
import { Event } from '@/lib/types/NewEvent';

interface Props {
    event: Event;
}

export default function EventDetail({ event }: Props) {
    return (
        <div
            id="detail"
            className="space-y-2 bg-white dark:bg-gray-700 shadow-md rounded-lg px-4 py-6 transition-all duration-300"
        >
            <h2 className="text-xl font-bold">รายละเอียดกิจกรรม</h2>
            <p>{event.description}</p>
            <p>
                <span className="font-semibold">วันที่:</span>{' '}
                {event.schedule.startDate} ({event.schedule.startTime} -{' '}
                {event.schedule.endTime})
            </p>
            <p>
                <span className="font-semibold">สถานที่:</span>{' '}
                {event.location.address}
            </p>
        </div>
    );
}
