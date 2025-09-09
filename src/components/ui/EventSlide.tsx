'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface EventCardProps {
    event: {
        id: string;
        title: string;
        schedule: { startDate: string; endDate: string };
        location: { venue: string };
        images: { thumbnail: string };
    };
}

export default function EventCard({ event }: EventCardProps) {
    return (
        <Link
            href={`/ticket/${event.id}`}
            className="min-w-[180px] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col items-center bg-white"
        >
            <div className="w-full h-48 relative">
                <Image
                    src={event.images.thumbnail}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                />
            </div>

            <div className="p-4 w-full flex flex-col items-center">
                <p className="text-sm text-gray-500 mb-2 text-center">
                    {new Date(event.schedule.startDate).toLocaleDateString(
                        'th-TH',
                        {
                            day: '2-digit',
                            month: 'short',
                        },
                    )}{' '}
                    -{' '}
                    {new Date(event.schedule.endDate).toLocaleDateString(
                        'th-TH',
                        {
                            day: '2-digit',
                            month: 'short',
                        },
                    )}
                </p>

                <h1 className="text-md font-bold text-center line-clamp-2">
                    {event.title}
                </h1>

                <div className="w-full">
                    <p className="flex justify-start text-sm text-gray-600 mt-2 w-full line-clamp-1">
                        <MapPinIcon width={20} /> {event.location.venue}
                    </p>
                </div>
            </div>
        </Link>
    );
}
