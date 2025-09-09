"use client";

import { Dialog } from "@headlessui/react";
import { Event } from "@/lib/schemas/event.schema";
import { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  open: boolean;
  mode: "view" | "edit";
  event: Event | null;
  onClose: () => void;
  onSave: (updated: Event) => void;
};

export default function EventModal({ open, mode, event, onClose, onSave }: Props) {
  const [form, setForm] = useState<Event | null>(event);

  // sync เมื่อ event เปลี่ยน
  useEffect(() => {
    setForm(event);
  }, [event]);

  if (!form) return null;

  // ✅ helper สำหรับ field ปกติ
  const updateField = (field: keyof Event, value: any) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  // ✅ helper สำหรับ schedule
  const updateSchedule = (field: keyof NonNullable<Event["schedule"]>, value: any) => {
    setForm((prev) =>
      prev
        ? {
            ...prev,
            schedule: {
              ...prev.schedule,
              [field]: value,
            },
          }
        : prev
    );
  };

  // ✅ helper สำหรับ pricing
  const updatePricing = (field: keyof NonNullable<Event["pricing"]>, value: any) => {
    setForm((prev) =>
      prev
        ? {
            ...prev,
            pricing: {
              ...prev.pricing,
              [field]: value,
              currency: prev.pricing?.currency ?? "THB", // default
            },
          }
        : prev
    );
  };

  // ✅ helper สำหรับ images
  const updateImages = (field: keyof NonNullable<Event["images"]>, value: any) => {
    setForm((prev) =>
      prev
        ? {
            ...prev,
            images: {
              ...prev.images,
              [field]: value,
            },
          }
        : prev
    );
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* backdrop */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-bold">
              {mode === "view" ? "View Event" : "Edit Event"}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {mode === "view" ? (
            <div className="space-y-2 text-base font-semibold">
              <p>
                <strong>ID:</strong> {form.id}
              </p>
              <p>
                <strong>Title:</strong> {form.title}
              </p>
              <p className="m-auto w-fit">
                <Image
                  src={form.images?.thumbnail ?? "/placeholder.png"}
                  width={400}
                  height={400}
                  alt="Event Thumbnail"
                />
              </p>
              <p>
                <strong>Description:</strong> {form.description}
              </p>
              <p>
                <strong>Price:</strong> {form.pricing?.earlyBird} {form.pricing?.currency}
              </p>
              <p>
                <strong>Category:</strong> {form.category}
              </p>
              <p>
                <strong>Status:</strong> {form.status}
              </p>
              <p>
                <strong>Date:</strong> {form.schedule?.startDate} → {form.schedule?.endDate}
              </p>
              <p>
                <strong>Time:</strong> {form.schedule?.startTime} → {form.schedule?.endTime}
              </p>
            
             
            </div>
          ) : (
            <form className="space-y-3">
              {/* Title */}
              <input
                type="text"
                value={form.title ?? ""}
                onChange={(e) => updateField("title", e.target.value)}
                className="border px-2 py-1 w-full"
                placeholder="Title"
              />

              {/* Description */}
              <textarea
                value={form.description ?? ""}
                onChange={(e) => updateField("description", e.target.value)}
                className="border px-2 py-1 w-full"
                placeholder="Description"
              />

              {/* Category */}
              <input
                type="text"
                value={form.category ?? ""}
                onChange={(e) => updateField("category", e.target.value)}
                className="border px-2 py-1 w-full"
                placeholder="Category"
              />

              {/* Price */}
              <input
                type="number"
                value={form.pricing?.earlyBird ?? ""}
                onChange={(e) => updatePricing("earlyBird", Number(e.target.value))}
                className="border px-2 py-1 w-full"
                placeholder="Ticket Price"
              />

              {/* Banner URL */}
              <input
                type="text"
                value={form.images?.banner ?? ""}
                onChange={(e) => updateImages("banner", e.target.value)}
                className="border px-2 py-1 w-full"
                placeholder="Banner URL"
              />

              {/* Thumbnail URL */}
              <input
                type="text"
                value={form.images?.thumbnail ?? ""}
                onChange={(e) => updateImages("thumbnail", e.target.value)}
                className="border px-2 py-1 w-full"
                placeholder="Thumbnail URL"
              />

              {/* Gallery URL */}
              <input
                type="text"
                value={form.images?.gallery ?? ""}
                onChange={(e) => updateImages("gallery", e.target.value)}
                className="border px-2 py-1 w-full"
                placeholder="Gallery URL"
              />

              {/* Date Inputs */}
              <div className="flex gap-2">
                <input
                  type="date"
                  value={form.schedule?.startDate ?? ""}
                  onChange={(e) => updateSchedule("startDate", e.target.value)}
                  className="border px-2 py-1 w-full"
                />
                <input
                  type="date"
                  value={form.schedule?.endDate ?? ""}
                  onChange={(e) => updateSchedule("endDate", e.target.value)}
                  className="border px-2 py-1 w-full"
                />
              </div>

              {/* Time Inputs */}
              <div className="flex gap-2">
                <input
                  type="time"
                  value={form.schedule?.startTime ?? ""}
                  onChange={(e) => updateSchedule("startTime", e.target.value)}
                  className="border px-2 py-1 w-full"
                />
                <input
                  type="time"
                  value={form.schedule?.endTime ?? ""}
                  onChange={(e) => updateSchedule("endTime", e.target.value)}
                  className="border px-2 py-1 w-full"
                />
              </div>

              {/* Save Button */}
              <button
                type="button"
                onClick={() => {
                  onSave(form);
                  onClose();
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                💾 Save
              </button>
            </form>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
