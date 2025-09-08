import LayoutMain from '@/layouts/LayoutMain'
import EventList from '@/components/ui/EventList'

export default async function EventsPage() {
  // ดึงข้อมูลจาก API ฝั่ง server (Server Component)
  const res = await fetch("http://54.169.154.143:3082/events")
  const data = await res.json()

  const raw = data[0]
  const eventsArray = Object.keys(raw)
    .filter((k) => !isNaN(Number(k)))
    .map((k) => raw[k])

  return (
    <LayoutMain>
      <div className="container mx-auto px-6 py-8 mt-[65px]">
        {/* ส่ง events ไปยัง Client Component */}
        <EventList initialEvents={eventsArray} />
      </div>
    </LayoutMain>
  )
}
