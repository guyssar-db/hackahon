import { z } from "zod";

export const OrganizerSchema = z.object({
  name: z.string(),
  contact: z.string(),
  phone: z.string(),
});

export const ScheduleSchema = z.object({
  startDate: z.string(), // ISO date string
  endDate: z.string(),
  startTime: z.string(), // "HH:mm"
  endTime: z.string(),
});

export const LocationSchema = z.object({
  address: z.string(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

export const PricingSchema = z.object({
  currency: z.string(),
  earlyBird: z.number().nullable(),
  regular: z.number().nullable(),
  student: z.number().nullable(),
  group: z.number().nullable(),
});

export const CapacitySchema = z.object({
  max: z.number(),
  registered: z.number(),
});

export const ImagesSchema = z.object({
  banner: z.string().url(),
  thumbnail: z.string().url(),
  gallery: z.array(z.string().url()),
});

// Optional sub-objects
export const SpeakerSchema = z.object({
  name: z.string(),
  bio: z.string().optional(),
  avatar: z.string().url().optional(),
});

export const ArtistSchema = z.object({
  name: z.string(),
  genre: z.string().optional(),
  avatar: z.string().url().optional(),
});

// ✅ Event schema
export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  status: z.enum(["active", "inactive"]).or(z.string()),

  organizer: OrganizerSchema,
  schedule: ScheduleSchema,
  location: LocationSchema,
  pricing: PricingSchema,
  capacity: CapacitySchema,
  images: ImagesSchema,

  tags: z.array(z.string()),
  requirements: z.array(z.string()).optional(),
  speakers: z.array(SpeakerSchema).optional(),
  tracks: z.array(z.string()).optional(),
  includes: z.array(z.string()).optional(),
  artists: z.array(ArtistSchema).optional(),
  distances: z.array(z.string()).optional(),
  activities: z.array(z.string()).optional(),
});

// ✅ Response schema (รองรับได้ทั้ง array ตรง ๆ และ object ห่อ array)
export const EventsResponseSchema = z.union([
  z.array(EventSchema),
  z.object({
    events: z.array(EventSchema),
    total: z.number().optional(),
  }),
]);

export type Event = z.infer<typeof EventSchema>;
export type EventsResponse = z.infer<typeof EventsResponseSchema>;
