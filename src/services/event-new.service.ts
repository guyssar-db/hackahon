import { EventsResponseSchema, EventsResponse } from "@/lib/schemas/event.schema";

export const getevent = async (): Promise<EventsResponse> => {
  const res = await fetch("http://54.169.154.143:3082/events", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const data = await res.json();

  //  validate ให้ตรง schema เสมอ
  const parsed = EventsResponseSchema.safeParse({ events: data });

  if (!parsed.success) {
    console.error("Schema validation error:", parsed.error);
    return []; // fallback
  }
  console.log("Parsed data:", parsed.data);
  return parsed.data;
};

export const updateEvent = async (id: string, data: Partial<Event>): Promise<Event> => {
  const res = await fetch(`http://54.169.154.143:3082/events/${id}`, {
    method: "PUT", // หรือ PATCH ถ้า backend รองรับ
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to update event");
  }

  const updated = await res.json();
  return updated as Event;
};

export const deleteEvent = async (id: string): Promise<void> => {
  const res = await fetch(`http://54.169.154.143:3082/events/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete event");
  }
};


export const createEvent = async (newEvent: Omit<Event, "id">): Promise<Event> => {
  const res = await fetch("http://54.169.154.143:3082/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEvent),
  });

  if (!res.ok) {
    throw new Error("Failed to create event");
  }

  const data = await res.json();
  return data; // server ควร return event ที่สร้างเสร็จ (มี id)
};