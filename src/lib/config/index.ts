import { Env } from '@/lib/schemas/cofig.schema';

export const config = Env.parse({
    base_url: process.env.BASE_URL,
    auth_url: process.env.AUTH_URL,
    event_url: process.env.EVENT_URL,
    ticket_url: process.env.TICKET_URL,
});
