import LayoutMain from '@/layouts/LayoutMain'
import EventList from '@/components/ui/EventList'
import type { Event } from '@/components/ui/EventList'

async function getEvents(): Promise<Event[]> {
  const res = await fetch("http://54.169.154.143:3082/events")
  const data = await res.json()
  const raw = data[0]
  return Object.keys(raw)
    .filter(k => !isNaN(Number(k)))
    .map(k => raw[k])
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <LayoutMain>
      <div className="container mx-auto px-6 py-8 mt-[65px]">
        <EventList initialEvents={events} />
      </div>
    </LayoutMain>
  )
}
