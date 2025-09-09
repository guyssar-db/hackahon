import { Env } from '@/lib/schemas/config.schema';

export const config = Env.parse({
  BASE_URL: process.env.BASE_URL,
  EVENT_URL: process.env.EVENT_URL,
  AUTH_URL: process.env.AUTH_URL,
  TICKET_URL: process.env.TICKET_URL,
});