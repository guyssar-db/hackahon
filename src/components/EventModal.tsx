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
           <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
             <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path d="M6 18L18 6M6 6l12 12"></path>
             </svg>
            </button>
          </div>

          {mode === "view" ? (
            <div className="space-y-2 text-base font-semibold">
              <p><strong>ID:</strong> {form.id}</p>
              <p><strong>Title:</strong> {form.title}</p>
              <p className="m-auto w-fit"> 
                <Image src={form.images.thumbnail}
                 width={400}
                 height={400}
                 alt="Picture of the author">
                </Image>
              </p>
              <p><strong>Description:</strong> {form.description}</p>
              <p><strong>Price:</strong> {form.pricing.earlyBird} {form.pricing.currency}</p>
              <p><strong>Category:</strong> {form.category}</p>
              <p><strong>Status:</strong> {form.status}</p>
            
            </div>
          ) : (
            <form className="space-y-3">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border px-2 py-1 w-full"
              />
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="border px-2 py-1 w-full"
              />
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border px-2 py-1 w-full"
              />
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
