'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Event } from '@/lib/types/NewEvent';
import LayoutMain from '@/layouts/LayoutMain';

// import Map แบบ dynamic เพื่อให้ SSR ปิด
const EventMap = dynamic(() => import('@/components/ui/EventMap'), { ssr: false });

export default function TicketPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [current, setCurrent] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState<string>('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch('http://54.169.154.143:3082/events', { cache: 'no-store' });
        const data = await res.json();
        const found = data.find((e: any) => e.id === id);
        if (found) setEvent(found);
      } catch (err) {
        console.error('Failed to fetch event', err);
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const images = [event.images.banner, ...(event.images.gallery || [])];

  const handleNext = () => setCurrent((current + 1) % images.length);
  const handlePrev = () => setCurrent((current - 1 + images.length) % images.length);
  const handlePurchase = () => {
    if (!selectedPrice) return alert('กรุณาเลือกประเภทตั๋วก่อน');
    alert(`เพิ่ม ${selectedPrice} ในตะกร้าสำเร็จ!`);
  };
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <LayoutMain>
      <div className='bg-gray-100 dark:bg-gray-900'>
        <div className="max-w-4xl mx-auto p-5 mt-[65px] space-y-6 text-gray-900 dark:text-gray-100 transition-colors duration-300 ">

          {/* Slide */}
          <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={images[current]}
              alt={event.title}
              fill
              sizes="100vw"
              className="object-cover rounded-lg"
            />
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700 text-black dark:text-white p-2 rounded-full cursor-pointer"
            >
              ❮
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700 text-black dark:text-white p-2 rounded-full cursor-pointer"
            >
              ❯
            </button>
          </div>

          {/* Mini Nav */}
          <div className="sticky top-[65px] bg-white dark:bg-gray-700 shadow-md rounded-lg px-4 py-2 flex justify-between items-center transition-all duration-300">
            <div className='w-full '>
              <button
                onClick={() => scrollToSection('buy-ticket')}
                className="px-3 py-1 w-full bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer"
              >
                To Buy Ticket
              </button>
            </div>
          </div>

          {/* Detail */}
          <div id="detail" className="space-y-2 bg-white dark:bg-gray-700 shadow-md rounded-lg px-4 py-6 transition-all duration-300">
            <h2 className="text-xl font-bold">รายละเอียดกิจกรรม</h2>
            <p>{event.description}</p>
            <p><span className="font-semibold">วันที่:</span> {event.schedule.startDate} - {event.schedule.endDate} ({event.schedule.startTime} - {event.schedule.endTime})</p>
            <p><span className="font-semibold">สถานที่:</span> {event.location.address}</p>
          </div>

          {/* Organizer */}
          <div id="organizer" className="space-y-1 bg-white dark:bg-gray-700 shadow-md rounded-lg px-4 py-6">
            <h2 className="text-xl font-bold">ผู้จัด</h2>
            <p>{event.organizer.name}</p>
            <p>{event.organizer.contact}</p>
            <p>{event.organizer.phone}</p>
          </div>

          {/* Coordinates + Map */}
          <div id="coordinates" className="space-y-4 bg-white dark:bg-gray-700 shadow-md rounded-lg px-4 py-6">
            <h2 className="text-xl font-bold">แผนที่</h2>
            <p>Lat: {event.location.coordinates.lat}, Lng: {event.location.coordinates.lng}</p>
            <EventMap
              lat={event.location.coordinates.lat}
              lng={event.location.coordinates.lng}
              address={event.location.address}
            />
          </div>

          {/* Buy Ticket */}
          <div id="buy-ticket" className="space-y-4 bg-white dark:bg-gray-700 shadow-md rounded-lg px-4 py-6">
            <h2 className="text-xl font-bold">ซื้อตั๋ว</h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(event.pricing).map(([key, value]) => {
                if (key === 'currency') return null;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedPrice(key)}
                    className={`px-4 py-2 border rounded-lg ${selectedPrice === key ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800/50 dark:text-gray-100 cursor-pointer'}`}
                  >
                    {key} - {value} {event.pricing.currency}
                  </button>
                );
              })}
            </div>
            <button
              onClick={handlePurchase}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
            >
              สั่งซื้อ
            </button>
          </div>
        </div>
      </div>
    </LayoutMain>
  );
}
