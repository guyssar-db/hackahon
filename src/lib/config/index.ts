import { Env } from '../schemas/config.schema';

export const config = Env.parse({
    BASE_URL: process.env.BASE_URL,
    AUTH_URL: process.env.AUTH_URL,
    EVENT_URL: process.env.EVENT_URL,
    TICKET_URL: process.env.TICKET_URL,
});