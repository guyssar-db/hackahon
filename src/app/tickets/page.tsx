import LayoutMain from '@/layouts/LayoutMain';
import EventList from '@/components/ui/EventList';
import type { Event } from '@/components/ui/EventList';
import { getEvent } from '@/services/event-new.service';

const getEvents = async (): Promise<Event[]> => {
    try {
        const res = await getEvent();
        const data = res.data as Event[];

        return data.map(
            (e): Event => ({
                ...e,
            }),
        );
    } catch (error) {
        console.error('Failed to fetch events', error);
        return [];
    }
};

export default async function EventsPage() {
    const events: Event[] = await getEvents();

    return (
        <LayoutMain>
            <div className="mx-auto px-6 py-8 mt-[65px] bg-gray-100 dark:bg-gray-800">
                <EventList initialEvents={events} />
            </div>
        </LayoutMain>
    );
}
