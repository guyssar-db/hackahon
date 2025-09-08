import LayoutMain from '@/layouts/LayoutMain'
import EventList from '@/components/ui/EventList'
import type { Event } from '@/components/ui/EventList'

async function getEvents(): Promise<Event[]> {
  const res = await fetch("http://54.169.154.143:3082/events")
  const data = await res.json()

  // JSON ใหม่เป็น array ของ events อยู่แล้ว
  return data.map((e: any) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    category: e.category,
    status: e.status,
    organizer: e.organizer,
    schedule: e.schedule,
    location: e.location,
    pricing: e.pricing,
    capacity: e.capacity,
    images: e.images,
    tags: e.tags,
    requirements: e.requirements || [],
    includes: e.includes || [],
    tracks: e.tracks || [],
    activities: e.activities || [],
    speakers: e.speakers || [],
    artists: e.artists || []
  }))
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <LayoutMain>
      <div className="mx-auto px-6 py-8 mt-[65px] bg-gray-100 dark:bg-gray-800">
        <EventList initialEvents={events} />
      </div>
    </LayoutMain>
  )
}
