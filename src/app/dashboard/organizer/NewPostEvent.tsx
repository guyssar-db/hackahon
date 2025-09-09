"use client";

import { createEvent } from "@/services/event-new.service";
import { useState } from "react";

export default function NewPostEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [galleryUrl, setGalleryUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newEvent: any = {
        status: "active", // ✅ เพิ่มค่า default
      };

      if (title) newEvent.title = title;
      if (description) newEvent.description = description;
      if (category) newEvent.category = category;

      if (price) {
        newEvent.pricing = { earlyBird: Number(price), currency: "THB" };
      }

      if (bannerUrl || thumbnailUrl || galleryUrl) {
        newEvent.images = {};
        if (bannerUrl) newEvent.images.banner = bannerUrl;
        if (thumbnailUrl) newEvent.images.thumbnail = thumbnailUrl;
        if (galleryUrl) newEvent.images.gallery = galleryUrl; // ✅ เปลี่ยนเป็น string
      }

      if (startDate || endDate || startTime || endTime) {
        newEvent.schedule = {};
        if (startDate) newEvent.schedule.startDate = startDate;
        if (endDate) newEvent.schedule.endDate = endDate;
        if (startTime) newEvent.schedule.startTime = startTime;
        if (endTime) newEvent.schedule.endTime = endTime;
      }

      const saved = await createEvent(newEvent);
      console.log("Event created:", saved);
      alert("Event created successfully!");

      // reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setBannerUrl("");
      setThumbnailUrl("");
      setGalleryUrl("");
      setStartDate("");
      setEndDate("");
      setStartTime("");
      setEndTime("");
    } catch (err) {
      console.error(err);
      alert("Failed to create event");
    }
  };

  return (
    <>
        <p>New Post Event</p>

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
                  type="text"
                  placeholder="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] py-3 px-4 text-base"
                />
              </div>
            </div>
          </div>

          {/* Banner URL */}
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Banner URL
            </label>
            <input
              type="text"
              placeholder="banner url"
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] py-3 px-4 text-base"
            />
          </div>

          {/* Thumbnail URL */}
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Thumbnail URL
            </label>
            <input
              type="text"
              placeholder="thumbnail url"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] py-3 px-4 text-base"
            />
          </div>

          {/* Gallery URL (string เดียว) */}
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Gallery URL
            </label>
            <input
              type="text"
              placeholder="gallery url"
              value={galleryUrl}
              onChange={(e) => setGalleryUrl(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] py-3 px-4 text-base"
            />
          </div>

          {/* Start Date & End Date */}
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] py-3 px-4 text-base"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] py-3 px-4 text-base"
                />
              </div>
            </div>
          </div>

          {/* Start Time & End Time */}
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Start Time
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] py-3 px-4 text-base"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  End Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] py-3 px-4 text-base"
                />
              </div>
            </div>
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
  </>
  );
}
