'use client';

import { useState } from 'react';
import { Event } from '@/lib/schemas/event.schema';
import EventModal from '@/components/EventModal';
import { updateEvent, deleteEvent } from '@/services/event-new.service';

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
    const [mode, setMode] = useState<'view' | 'edit'>('view');

    // loading + message state
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    const handleDelete = async (id: string) => {
        try {
            setLoading(true);
            await deleteEvent(id);
            const newEvents = events.filter((e) => e.id !== id);
            setEvents(newEvents);

            if ((page - 1) * pageSize >= newEvents.length) {
                setPage(Math.max(1, page - 1)); // ✅ กันหน้าเปล่า
            }

            setMessage({
                type: 'success',
                text: '🗑 Event deleted successfully!',
            });
        } catch (error) {
            console.error('Delete failed:', error);
            setMessage({ type: 'error', text: '❌ Delete failed' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (event: Event) => {
        setSelected(event);
        setMode('edit');
        setOpen(true);
    };

    const handleView = (event: Event) => {
        setSelected(event);
        setMode('view');
        setOpen(true);
    };

    const handleSave = async (updated: Event) => {
        if (!updated.id) {
            console.error('Event ID is missing!');
            setMessage({ type: 'error', text: '❌ Event ID is missing' });
            return;
        }

        try {
            setLoading(true);
            const saved = await updateEvent(updated.id, updated);
            setEvents(events.map((e) => (e.id === updated.id ? saved : e)));
            setMessage({
                type: 'success',
                text: '💾 Event updated successfully!',
            });
        } catch (err) {
            console.error('Update failed:', err);
            setMessage({ type: 'error', text: '❌ Update failed' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full overflow-hidden overflow-x-scroll hide-scrollbar'>
            <div className="w-full shadow-lg rounded-lg overflow-hidden overflow-x-scroll hide-scrollbar">
                {/* Toast */}
                {message && (
                    <div
                        className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white ${
                            message.type === 'success'
                                ? 'bg-green-500'
                                : 'bg-red-500'
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                {loading && (
                    <div className="text-center py-2 text-blue-600">
                        ⏳ Processing...
                    </div>
                )}

                <table className="w-full table-auto bg-white shadow-md rounded-lg border border-gray-200 ">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">
                                ID
                            </th>
                            <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">
                                Image
                            </th>
                            <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">
                                Event Title
                            </th>
                            <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">
                                Description
                            </th>
                            <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">
                                Date
                            </th>
                            <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">
                                Category
                            </th>
                            <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((e) => (
                            <tr key={e.id} className="text-center border-b">
                                {/* ID */}
                                <td className="py-4 px-6">{e.id}</td>

                                {/* ✅ Image column */}
                                <td className="py-4 px-6">
                                    {e.images?.thumbnail ? (
                                        <img
                                            src={e.images.thumbnail}
                                            alt={e.title ?? 'Event'}
                                            className="w-16 h-16 rounded-md object-cover mx-auto"
                                        />
                                    ) : (
                                        <span className="text-gray-400">
                                            No Image
                                        </span>
                                    )}
                                </td>

                                {/* Title */}
                                <td className="py-4 px-6 text-gray-800 font-medium">
                                    {e.title}
                                </td>

                                {/* Description */}
                                <td className="py-4 px-6">{e.description}</td>

                                {/* Date */}
                                <td className="py-4 px-6">
                                    {e.schedule?.startDate ?? '-'}
                                </td>

                                {/* Category */}
                                <td className="py-4 px-6">
                                    {e.category ?? '-'}
                                </td>

                                {/* Actions */}
                                <td className="py-4 px-6">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => handleView(e)}
                                            className="px-3 py-1 bg-gray-500 text-white rounded"
                                        >
                                            👀 View
                                        </button>
                                        <button
                                            onClick={() => handleEdit(e)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(e.id!)}
                                            className="px-3 py-1 bg-red-500 text-white rounded"
                                        >
                                            🗑 Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* pagination */}
            </div>
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
