import { EventsResponseSchema, EventsResponse } from "@/lib/schemas/event.schema";

export const getevent = async (): Promise<EventsResponse> => {
  const res = await fetch("http://54.169.154.143:3082/events", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const data = await res.json();

  // ✅ validate ให้ตรง schema เสมอ
  const parsed = EventsResponseSchema.safeParse({ events: data });

  if (!parsed.success) {
    console.error("Schema validation error:", parsed.error);
    return []; // fallback
  }
  console.log("Parsed data:", parsed.data);
  return parsed.data;
};
