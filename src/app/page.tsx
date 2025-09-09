// src/app/page.tsx
import BannerHome from "@/components/ui/bannerHome";
import LayoutMain from "@/layouts/LayoutMain";
import PopularEvents from "@/components/ui/PopularEvents";

interface Event {
  id: string
  title: string
  schedule: { startDate: string; endDate: string }
  location: { address: string }
  images: { thumbnail: string }
  status: string
  capacity: { registered: number }
}

export default async function Home() {
  const res = await fetch('http://54.169.154.143:3082/events');
  const data = await res.json();

  // filter active, sort ตามคนสมัครเยอะสุด, slice 6 รายการ
  const popularEvents: Event[] = data
    .filter((e: Event) => e.status === 'active')
    .sort((a: Event, b: Event) => (b.capacity.registered || 0) - (a.capacity.registered || 0))
    .slice(0, 6);

  return (
    <LayoutMain>
      <div className="min-h-[calc(100vh-65px)] flex flex-col items-center mt-[65px] bg-gray-100 dark:bg-gray-800">

        {/* Banner */}
            <BannerHome />

        {/* Popular Events */}
        <PopularEvents events={popularEvents} />

      </div>
    </LayoutMain>
  );
}
