'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Event } from '@/lib/types/NewEvent';
import LayoutMain from '@/layouts/LayoutMain';

import EventSlider from '@/components/ui/TicketId/EventSlider';
import MiniNav from '@/components/ui/TicketId/MiniNav';
import EventDetail from '@/components/ui/TicketId/EventDetail';
import OrganizerInfo from '@/components/ui/TicketId/OrganizerInfo';
import EventMapSection from '@/components/ui/TicketId/EventMapSection';
import BuyTicketSection from '@/components/ui/TicketId/BuyTicketSection';

export default function TicketPage() {
    const { id } = useParams();
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch('http://54.169.154.143:3082/events', {
                    cache: 'no-store',
                });
                const data = await res.json();
                const found = data.find((e: any) => e.id === id);
                if (found) setEvent(found);
            } catch (err) {
                console.error('Failed to fetch event', err);
            }
        };
        fetchEvent();
    }, [id]);

    if (!event) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <LayoutMain>
            <div className="bg-gray-100 dark:bg-gray-900 z-0">
                <div className="max-w-4xl mx-auto p-5 mt-[65px] space-y-6 text-gray-900 dark:text-gray-100 transition-colors duration-300 ">
                    <EventSlider
                        images={[
                            ...(event.images.banner
                                ? [event.images.banner]
                                : []),
                            ...(Array.isArray(event.images.gallery)
                                ? event.images.gallery.filter(
                                      (img) => img?.trim() !== '',
                                  )
                                : []),
                        ]}
                        title={event.title}
                    />

                    <MiniNav />

                    <EventDetail event={event} />

                    <OrganizerInfo organizer={event.organizer} />

                    <EventMapSection location={event.location} />

                    <BuyTicketSection pricing={event.pricing} />
                </div>
            </div>
        </LayoutMain>
    );
}
