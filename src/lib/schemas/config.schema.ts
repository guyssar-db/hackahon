import { z } from 'zod';

export const Env = z.object({
    BASE_URL: z.string().nullish(),
    AUTH_URL: z.string().nullish(),
    EVENT_URL: z.string().nullish(),
    TICKET_URL: z.string().nullish(),
});