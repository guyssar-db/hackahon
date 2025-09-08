import { Navbar } from "@/components/navbar"
import { EventDetails } from "@/components/event-details"
import { TicketPurchase } from "@/components/ticket-purchase"

interface PageProps {
  params: {
    id: string
  }
}

export default function EventDetailPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2">
            <EventDetails eventId={params.id} />
          </div>

          {/* Purchase Section */}
          <div className="lg:col-span-1">
            <TicketPurchase eventId={params.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
