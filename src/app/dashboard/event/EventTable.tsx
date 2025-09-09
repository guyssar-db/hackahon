"use client";

import { useState } from "react";
import { Event } from "@/lib/schemas/event.schema";
import EventModal from "@/components/EventModal";
import { updateEvent,deleteEvent } from "@/services/event-new.service";

type Props = {
  data: Event[];
};

export default function EventTable({ data }: Props) {
  const [events, setEvents] = useState<Event[]>(data ?? []);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(events.length / pageSize));
  const paginated = events.slice((page - 1) * pageSize, page * pageSize);

  // modal states
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Event | null>(null);
  const [mode, setMode] = useState<"view" | "edit">("view");

//   const handleDelete = (id: string) => {
//     setEvents(events.filter((e) => e.id !== id));
//   };

const handleDelete = async (id: string) => {
  try {
    await deleteEvent(id); // ✅ ลบจาก API จริง
    setEvents(events.filter((e) => e.id !== id)); // ลบจาก state
  } catch (error) {
    console.error("Delete failed:", error);
  }
};

  const handleEdit = (event: Event) => {
    setSelected(event);
    setMode("edit");
    setOpen(true);
  };

  const handleView = (event: Event) => {
    setSelected(event);
    setMode("view");
    setOpen(true);
  };

//   const handleSave = (updated: Event) => {
//     setEvents(events.map((e) => (e.id === updated.id ? updated : e)));
//   };

    const handleSave = async (updated: Event) => {
    try {
        const saved = await updateEvent(updated.id, updated); // ยิง API จริง
        setEvents(events.map((e) => (e.id === updated.id ? updated : e))); // อัปเดต state
    } catch (err) {
        console.error("Update failed:", err);
        alert("❌ Update failed");
    }
    };

  return (
    <div className="w-full shadow-lg rounded-lg overflow-hidden">
      <table className="min-w-full border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-auto py-4 px-5 text-left text-gray-600 font-bold uppercase">ID</th>
            <th className="w-auto py-4 px-15 text-left text-gray-600 font-bold uppercase">Title</th>
            <th className="w-auto py-4 px-20 text-left text-gray-600 font-bold uppercase">Description</th>
            <th className="w-auto py-4 px-10 text-left text-gray-600 font-bold uppercase">Category</th>
            <th className="w-auto py-4 px-10 text-left text-gray-600 font-bold uppercase">Status</th>
            <th className="w-auto py-4 px-10 text-left text-gray-600 font-bold uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((e) => (
            <tr key={e.id} className="text-center">
              <td className="py-4 px-6 border-b border-gray-200">{e.id}</td>
              <td className="py-4 px-6 border-b border-gray-200">{e.title}</td>
              <td className="py-4 px-6 border-b border-gray-200">{e.description}</td>
              <td className="py-4 px-6 border-b border-gray-200">{e.category}</td>
              <td className="py-4 px-6 border-b border-gray-200">{e.status}</td>
              <td className="py-4 px-4 border-b border-gray-200 flex justify-center space-x-2">
                <button onClick={() => handleView(e)} className="px-2 py-1 bg-gray-500 text-white rounded">
                  👀 View
                </button>
                <button onClick={() => handleEdit(e)} className="px-2 py-1 bg-blue-500 text-white rounded">
                  ✏️ Edit
                </button>
                <button onClick={() => handleDelete(e.id)} className="px-2 py-1 bg-red-500 text-white rounded">
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* pagination */}
      <div className="flex justify-center items-center space-x-2">
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

      {/* modal */}
      <EventModal
        open={open}
        onClose={() => setOpen(false)}
        event={selected}
        mode={mode}
        onSave={handleSave}
      />
    </div>
  );
}
