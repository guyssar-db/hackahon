import { z } from 'zod';

export const Env = z.object({
    BASE_URL: z.string().default('localhost:3082'),
    AUTH_URL: z.string(),
    EVENT_URL: z.string(),
    TICKET_URL: z.string(),
});
