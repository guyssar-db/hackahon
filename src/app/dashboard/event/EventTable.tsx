"use client";

import { useState } from "react";
import { Event } from "@/lib/schemas/event.schema";

type Props = {
  data: Event[];
};

export default function EventTable({ data }: Props) {
  const [events, setEvents] = useState<Event[]>(data ?? []);

  // ✅ Pagination
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(events.length / pageSize));
  const paginated = events.slice((page - 1) * pageSize, page * pageSize);

  // ✅ Handlers
  const handleDelete = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const handleEdit = (id: string) => {
    alert(`Edit event id: ${id}`);
  };

  const handleView = (id: string) => {
    alert(`View event id: ${id}`);
  };

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-3 py-2">ID</th>
            <th className="border border-gray-300 px-3 py-2">Title</th>
            <th className="border border-gray-300 px-3 py-2">Description</th>
            <th className="border border-gray-300 px-3 py-2">Category</th>
            <th className="border border-gray-300 px-3 py-2">Status</th>
            <th className="border border-gray-300 px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((e) => (
            <tr key={e.id} className="text-center">
              <td className="border border-gray-300 px-3 py-2">{e.id}</td>
              <td className="border border-gray-300 px-3 py-2">{e.title}</td>
              <td className="border border-gray-300 px-3 py-2">{e.description}</td>
              <td className="border border-gray-300 px-3 py-2">{e.category}</td>
              <td className="border border-gray-300 px-3 py-2">{e.status}</td>
              <td className="border border-gray-300 px-3 py-2 space-x-2">
                <button
                  onClick={() => handleView(e.id)}
                  className="px-2 py-1 bg-gray-500 text-white rounded"
                >
                  👀 View
                </button>
                <button
                  onClick={() => handleEdit(e.id)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(e.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Pagination controls */}
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
    </div>
  );
}
