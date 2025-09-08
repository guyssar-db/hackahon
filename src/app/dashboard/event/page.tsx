'use client';

import React, { useState, useEffect } from 'react';
import Pagination from '@/components/pagination';
import { Event } from '@/lib/types/event';
import { getEvents } from '@/services/event.service';
import type { AxiosResponse } from 'axios';

const ITEMS_PER_PAGE = 5;

export default function EventTablePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    totalItems: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const res: AxiosResponse<any> = await getEvents(page, ITEMS_PER_PAGE);
      const { events: fetchedEvents, metadata: { pagination: fetchedPagination } } = res.data;

      setEvents(fetchedEvents);
      setPagination(fetchedPagination);
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setError('Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Events Table</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="border px-4 py-2">{event.id}</td>
                  <td className="border px-4 py-2">{event.title}</td>
                  <td className="border px-4 py-2">{event.description}</td>
                  <td className="border px-4 py-2">{event.category}</td>
                  <td className="border px-4 py-2">{event.type}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
