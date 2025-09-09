import { z } from "zod";

export const OrganizerSchema = z.object({
  name: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
});

export const ScheduleSchema = z.object({
  startDate: z.string().optional().nullable(), // ISO date string
  endDate: z.string().optional().nullable(),
  startTime: z.string().optional().nullable(), // "HH:mm"
  endTime: z.string().optional().nullable(),
});

export const LocationSchema = z.object({
  address: z.string().optional().nullable(),
  coordinates: z
    .object({
      lat: z.number().optional().nullable(),
      lng: z.number().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export const PricingSchema = z.object({
  currency: z.string().optional().nullable(),
  earlyBird: z.number().optional().nullable(),
  regular: z.number().optional().nullable(),
  student: z.number().optional().nullable(),
  group: z.number().optional().nullable(),
});

export const CapacitySchema = z.object({
  max: z.number().optional().nullable(),
  registered: z.number().optional().nullable(),
});

export const ImagesSchema = z.object({
  banner: z.string().optional().nullable(),     // ไม่บังคับเป็น URL
  thumbnail: z.string().optional().nullable(),
  gallery: z.array(z.string()).optional().nullable(),
});

export const SpeakerSchema = z.object({
  name: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().url().optional().nullable(),
});

export const ArtistSchema = z.object({
  name: z.string().optional().nullable(),
  genre: z.string().optional().nullable(),
  avatar: z.string().url().optional().nullable(),
});

// ✅ Event schema (ทุก field optional/nullable)
export const EventSchema = z.object({
  id: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  status: z.enum(["active", "inactive"]).or(z.string()).optional().nullable(),

  organizer: OrganizerSchema.optional().nullable(),
  schedule: ScheduleSchema.optional().nullable(),
  location: LocationSchema.optional().nullable(),
  pricing: PricingSchema.optional().nullable(),
  capacity: CapacitySchema.optional().nullable(),
  images: ImagesSchema.optional().nullable(),

  tags: z.array(z.string()).optional().nullable(),
  requirements: z.array(z.string()).optional().nullable(),
  speakers: z.array(SpeakerSchema).optional().nullable(),
  tracks: z.array(z.string()).optional().nullable(),
  includes: z.array(z.string()).optional().nullable(),
  artists: z.array(ArtistSchema).optional().nullable(),
  distances: z.array(z.string()).optional().nullable(),
  activities: z.array(z.string()).optional().nullable(),
});

// ✅ Response schema (รองรับทั้ง array และ object wrapper)
export const EventsResponseSchema = z.union([
  z.array(EventSchema),
  z.object({
    events: z.array(EventSchema).optional().nullable(),
    total: z.number().optional().nullable(),
  }),
]);

export type Event = z.infer<typeof EventSchema>;
export type EventsResponse = z.infer<typeof EventsResponseSchema>;
