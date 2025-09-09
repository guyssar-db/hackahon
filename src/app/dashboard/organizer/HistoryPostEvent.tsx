"use client";

import { useEffect, useState } from "react";
import { Event } from "@/lib/schemas/event.schema";
import { geteventhistory } from "@/services/event-new.service";

export default function EventTable() {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ ดึงข้อมูลจาก service
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await geteventhistory();
        const rawEvents = Array.isArray(res) ? res : res?.events ?? [];
        setEvents(rawEvents);
      } catch (err) {
        console.error("Fetch events failed:", err);
        setError("❌ Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const totalPages = Math.max(1, Math.ceil(events.length / pageSize));
  const paginated = events.slice((page - 1) * pageSize, page * pageSize);

  if (loading) {
    return <div className="text-center py-6">⏳ Loading events...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  return (
    <>
    <p>History Post Event</p>
    <div className="flex items-center justify-center h-[70vh]">
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg border border-gray-200">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-4 text-left text-gray-600 font-medium">ID</th>
              <th className="px-6 py-4 text-left text-gray-600 font-medium">Image</th>
              <th className="px-6 py-4 text-left text-gray-600 font-medium">Event Title</th>
              <th className="px-6 py-4 text-left text-gray-600 font-medium">Description</th>
              <th className="px-6 py-4 text-left text-gray-600 font-medium">Date</th>
              <th className="px-6 py-4 text-left text-gray-600 font-medium">Category</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((e) => (
              <tr key={e.id} className="border-b">
                <td className="px-6 py-4">{e.id}</td>
                <td className="px-6 py-4">
                  {e.images?.thumbnail ? (
                    <img
                      src={e.images.thumbnail}
                      alt={e.title ?? "Event"}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-800 font-medium">{e.title}</td>
                <td className="px-6 py-4">{e.description}</td>
                <td className="px-6 py-4">{e.schedule?.startDate ?? "-"}</td>
                <td className="px-6 py-4">{e.category ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagination */}
        <div className="flex justify-center items-center space-x-2 py-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ⬅ Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
