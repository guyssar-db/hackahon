import { getEvents } from '@/services/event.service';
import EventTable from './EventTable';
import { Event } from '@/lib/types/event';
import { AxiosResponse } from 'axios';

export default async function Page() {
    const jsondata: AxiosResponse<Event[]> = await getEvents();
    return (
        <div className="p-6 w-full">
            <h1 className="text-2xl font-bold mb-6">🎉 Events Dashboard</h1>
            <EventTable data={jsondata.data} />
        </div>
    );
}
