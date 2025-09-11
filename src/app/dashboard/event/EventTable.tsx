'use client';

import { memo, useCallback, useMemo, useState, useTransition } from 'react';
import type { Event } from '@/lib/schemas/event.schema';
import EventModal from '@/components/EventModal';
import { updateEvent, deleteEvent } from '@/services/event-new.service';

type Props = { data: Event[] };

function EventTableBase({ data }: Props) {
    const [events, setEvents] = useState<Event[]>(data ?? []);
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const [{ open, mode, selected, msg }, setUI] = useState<{
        open: boolean;
        mode: 'view' | 'edit';
        selected: Event | null;
        msg: { type: 'success' | 'error'; text: string } | null;
    }>({ open: false, mode: 'view', selected: null, msg: null });

    const [isPending, startTransition] = useTransition();

    const totalPages = useMemo(
        () => Math.max(1, Math.ceil(events.length / pageSize)),
        [events.length],
    );

    const paginated = useMemo(
        () => events.slice((page - 1) * pageSize, page * pageSize),
        [events, page],
    );

    const toast = useCallback(
        (type: 'success' | 'error', text: string) =>
            setUI((s) => ({ ...s, msg: { type, text } })),
        [],
    );

    const openModal = useCallback(
        (nextMode: 'view' | 'edit', ev: Event) =>
            setUI((s) => ({ ...s, open: true, mode: nextMode, selected: ev })),
        [],
    );

    const closeModal = useCallback(
        () => setUI((s) => ({ ...s, open: false, selected: null })),
        [],
    );

    const handleDelete = useCallback(
        (id: string) => {
            startTransition(async () => {
                try {
                    await deleteEvent(id);
                    setEvents((prev) => {
                        const next = prev.filter((e) => e.id !== id);
                        setPage((p) =>
                            Math.min(
                                Math.max(1, p),
                                Math.max(1, Math.ceil(next.length / pageSize)),
                            ),
                        );
                        return next;
                    });
                    toast('success', '🗑 Event deleted successfully!');
                } catch (e) {
                    console.error('Delete failed:', e);
                    toast('error', '❌ Delete failed');
                }
            });
        },
        [toast],
    );

    const handleSave = useCallback(
        (updated: Event) => {
            if (!updated?.id) {
                toast('error', '❌ Event ID is missing');
                return;
            }
            startTransition(async () => {
                try {
                    const saved = await updateEvent(updated.id!, updated);
                    setEvents((prev) =>
                        prev.map((e) =>
                            e.id === updated.id ? { ...e, ...saved } : e,
                        ),
                    );
                    toast('success', '💾 Event updated successfully!');
                    closeModal();
                } catch (e) {
                    console.error('Update failed:', e);
                    toast('error', '❌ Update failed');
                }
            });
        },
        [toast, closeModal],
    );

    return (
        <div className="w-full overflow-x-auto hide-scrollbar">
            {msg && (
                <div
                    className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white ${
                        msg.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                >
                    {msg.text}
                </div>
            )}

            {isPending && (
                <div className="text-center py-2 text-blue-600">
                    ⏳ Processing...
                </div>
            )}

            <table className="w-full table-auto bg-white shadow-md rounded-lg border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        {[
                            'ID',
                            'Image',
                            'Event Title',
                            'Description',
                            'Date',
                            'Category',
                            'Actions',
                        ].map((h) => (
                            <th
                                key={h}
                                className="py-4 px-6 text-gray-600 font-bold uppercase"
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginated.map((e) => {
                        const {
                            id,
                            title,
                            description,
                            schedule,
                            category,
                            images,
                        } = e;
                        const { thumbnail } = images ?? {};
                        const { startDate } = schedule ?? {};

                        return (
                            <tr key={id} className="border-b">
                                <td className="py-4 px-6">{id}</td>
                                <td className="py-4 px-6">
                                    {thumbnail ? (
                                        <img
                                            src={thumbnail}
                                            alt={title ?? 'Event'}
                                            className="w-16 h-16 rounded-md object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-400">
                                            No Image
                                        </span>
                                    )}
                                </td>
                                <td className="py-4 px-6 font-medium text-gray-800">
                                    {title}
                                </td>
                                <td className="py-4 px-6">{description}</td>
                                <td className="py-4 px-6">
                                    {startDate ?? '-'}
                                </td>
                                <td className="py-4 px-6">{category ?? '-'}</td>
                                <td className="py-4 px-6">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openModal('view', e)}
                                            className="px-3 py-1 bg-gray-500 text-white rounded"
                                        >
                                            👀 View
                                        </button>
                                        <button
                                            onClick={() => openModal('edit', e)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(id!)}
                                            className="px-3 py-1 bg-red-500 text-white rounded"
                                        >
                                            🗑 Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}

                    {paginated.length === 0 && (
                        <tr>
                            <td
                                className="py-8 text-center text-gray-500"
                                colSpan={7}
                            >
                                No events
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="flex justify-center items-center gap-2 py-3">
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

            <EventModal
                open={open}
                onClose={closeModal}
                event={selected}
                mode={mode}
                onSave={handleSave}
            />
        </div>
    );
}

const EventTable = memo(EventTableBase);
export default EventTable;
