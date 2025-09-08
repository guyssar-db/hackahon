import { Event } from '@/lib/types/event';
import { BASE_URL, EVENT_URL } from './constants/config.service';
import { type AxiosResponse, http } from './http/http.service';

export async function getEvents(): Promise<AxiosResponse<Event[]>> {
    return await http.get<Event[]>(`${BASE_URL}/${EVENT_URL}`);
}

export async function getEventById(id: number): Promise<AxiosResponse<Event>> {
    return await http.get<Event>(`${BASE_URL}/${EVENT_URL}/${id}`);
}

export async function createEvent(
    eventData: Event,
): Promise<AxiosResponse<Event>> {
    return await http.post<Event>(`${BASE_URL}/${EVENT_URL}`, eventData);
}

export async function updateEvent(
    id: number,
    eventData: Event,
): Promise<AxiosResponse<Event>> {
    return await http.put<Event>(`${BASE_URL}/${EVENT_URL}/${id}`, eventData);
}

export async function deleteEvent(id: number): Promise<AxiosResponse<void>> {
    return await http.delete<void>(`${BASE_URL}/${EVENT_URL}/${id}`);
}
