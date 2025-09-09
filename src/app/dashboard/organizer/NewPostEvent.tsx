"use client";

import { createEvent } from "@/services/event-new.service";
import { useState } from "react";


export default function NewPostEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newEvent = {
        title,
        description,
        category,
        status: "active",
        pricing: { earlyBird: Number(price), currency: "THB" },
        images: { thumbnail: imageUrl },
        date,
      };

      const saved = await createEvent(newEvent);
      console.log("✅ Event created:", saved);
      alert("🎉 Event created successfully!");
      
      // reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setImageUrl("");
      setDate("");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create event");
    }
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form onSubmit={handleSubmit}>
          {/* Event Title */}
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Event Title
            </label>
            <input
              type="text"
              placeholder="your event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] py-3 px-4 text-base"
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Description
            </label>
            <textarea
              placeholder="Add your event description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-40 w-full resize-none rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          {/* Category & Price */}
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] py-3 px-4 text-base"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Tickets Price
                </label>
                <input
                  type="number"
                  placeholder="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] py-3 px-4 text-base"
                />
              </div>
            </div>
          </div>

          {/* Image URL */}
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Image URL
            </label>
            <input
              type="text"
              placeholder="image url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] py-3 px-4 text-base"
            />
          </div>

          {/* Date */}
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] py-3 px-4 text-base"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-[#6A64F1] py-3 px-8 text-white font-semibold shadow-md hover:shadow-lg transform transition active:scale-95"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
