'use client'
import Image from "next/image"
import Link from "next/link"
import { MapPinIcon } from '@heroicons/react/24/solid'
import type {EventCardProps} from '@/lib/types/NewEvent'


export default function EventCard({ event }: EventCardProps) {
  return (
    <Link
  href={`/tickets/${event.id}`}
  className="w-48 flex-shrink-0 dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden 
             hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col 
             items-center bg-white"
>
  {/* Thumbnail */}
  <div className="w-full h-40 relative">
    <Image
      src={event.images.thumbnail}
      alt={event.title}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className="object-cover"
    />
  </div>

  {/* Content */}
  <div className="p-4 w-full flex flex-col items-center dark:text-white">
    {/* วันที่ */}
    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">
      {new Date(event.schedule.startDate).toLocaleDateString("th-TH", {
        day: "2-digit",
        month: "short",
      })}{" "}
      -{" "}
      {new Date(event.schedule.endDate).toLocaleDateString("th-TH", {
        day: "2-digit",
        month: "short",
      })}
    </p>

    {/* ชื่อ */}
    <h1 className="text-md font-semibold text-center line-clamp-2 min-h-[3rem]">
      {event.title}
    </h1>

    {/* ที่อยู่ */}
    <div className="w-full flex items-start mt-2 gap-1">
      <MapPinIcon width={18} className="text-red-500 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
        {event.location.address}
      </p>
    </div>
  </div>
</Link>

  )
}
