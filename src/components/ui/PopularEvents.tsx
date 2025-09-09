'use client';
import EventCard from './EventCard';

interface Event {
    id: string;
    title: string;
    schedule: { startDate: string; endDate: string };
    location: { address: string };
    images: { thumbnail: string };
    status: string;
    capacity: { registered: number };
}

interface Props {
    events: Event[];
}

export default function PopularEvents({ events }: Props) {
    if (!events.length)
        return (
            <p className="text-center py-10 dark:text-white">
                Loading popular events...
            </p>
        );

    return (
        <section className="flex flex-col justify-center w-[86%] p-4 mt pt-10">
            <p className="text-4xl py-5 dark:text-white">ขายดีที่สุดในตอนนี้</p>

            <div className="flex gap-6 w-full overflow-x-scroll hide-scrollbar">
                {events.map((event, index) => (
                    <EventCard key={`${event.id}-${index}`} event={event} />
                ))}
            </div>
        </section>
    );
}
