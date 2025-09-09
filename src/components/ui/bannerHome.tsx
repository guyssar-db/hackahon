'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Event } from '@/lib/types/NewEvent';
import { useRouter } from 'next/navigation';

export default function BannerHome() {
    const router = useRouter();
    const [events, setEvents] = useState<Event[]>([]);
    const [current, setCurrent] = useState(0);

    // fetch events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('http://54.169.154.143:3082/events', {
                    cache: 'no-store',
                });
                const data = await res.json();
                const mapped: Event[] = data.map((e: any) => ({
                    id: e.id,
                    title: e.title,
                    description: e.description,
                    category: e.category,
                    status: e.status,
                    organizer: e.organizer,
                    schedule: e.schedule,
                    location: e.location,
                    pricing: e.pricing,
                    capacity: e.capacity,
                    images: e.images,
                    tags: e.tags || [],
                }));

                const sorted = mapped.sort(
                    (a, b) =>
                        new Date(a.schedule?.startDate || 0).getTime() -
                        new Date(b.schedule?.startDate || 0).getTime(),
                );

                setEvents(sorted);
            } catch (err) {
                console.error('Failed to fetch events', err);
            }
        };
        fetchEvents();
    }, []);

    // auto slide
    useEffect(() => {
        if (events.length === 0) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % events.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [events]);

    const nextSlide = () => setCurrent((current + 1) % events.length);
    const prevSlide = () =>
        setCurrent((current - 1 + events.length) % events.length);

    const goToTicket = (id: string) => router.push(`/tickets/${id}`);

    if (events.length === 0) {
        return (
            <div className="w-full h-56 md:h-96 bg-gray-200 flex items-center justify-center rounded-lg">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <section
            className="relative flex flex-col items-center w-full p-5 bg-cover bg-center transition-all duration-700"
            style={{
                backgroundImage: `url(${events[current].images?.banner || '/fallback.png'})`,
            }}
        >
            {/* overlay blur + darken */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>

            <div className="relative z-0 w-[90%] lg:w-[60%]">
                <div className="relative w-full h-56 md:h-96 overflow-hidden rounded-lg shadow-lg">
                    {events.length > 0 && (
                        <div
                            key={events[current].id}
                            className="relative w-full h-full cursor-pointer"
                            onClick={() => goToTicket(events[current].id)}
                        >
                            <Image
                                src={
                                    events[current].images?.banner ||
                                    '/fallback.png'
                                }
                                alt={events[current].title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                                className="object-cover rounded-lg"
                            />
                            <div className="absolute bottom-6 left-6 bg-black/50 text-white px-4 py-2 rounded-lg">
                                <h3 className="text-lg font-semibold">
                                    {events[current].title}
                                </h3>
                                <p className="text-sm">
                                    {events[current].schedule?.startDate}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* navigation buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/40 hover:bg-white/70 text-black p-2 rounded-full z-20 cursor-pointer"
                    >
                        ❮
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/40 hover:bg-white/70 text-black p-2 rounded-full z-20 cursor-pointer"
                    >
                        ❯
                    </button>

                    {/* dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {events.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`w-3 h-3 rounded-full cursor-pointer ${
                                    current === index
                                        ? 'bg-blue-500'
                                        : 'bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
