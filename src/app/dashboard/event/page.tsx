// app/dashboard/event/page.tsx
import { getevent } from '@/services/event-new.service';
import { Event } from '@/lib/schemas/event.schema';
import EventTable from './EventTable';

export default async function Page() {
    let events: Event[] = [];

    try {
        const res = await getevent();
        events = Array.isArray(res) ? res : (res?.events ?? []);
    } catch (e) {
        console.error('Fetch events failed:', e);
    }

    return (
        <div className="p-6 w-full">
            <h1 className="text-2xl font-bold mb-6">🎉 Events Dashboard</h1>
            <EventTable data={events} />
        </div>
    );
}
