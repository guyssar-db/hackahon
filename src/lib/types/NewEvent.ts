export interface Event {
    id: string
    title: string
    description: string
    category: string
    status: string
    organizer: {
      name: string
      contact: string
      phone: string
    }
    schedule: {
      startDate: string
      endDate: string
      startTime: string
      endTime: string
    }
    location: {
      address: string
      coordinates: { lat: number; lng: number }
    }
    pricing: {
      currency: string
      [key: string]: number | string
    }
    capacity: {
      max: number
      registered: number
    }
    images: {
      banner: string
      thumbnail: string
      gallery: string[]
    }
    tags: string[]
    requirements?: string[]
    includes?: string[]
    tracks?: string[]
    activities?: string[]
    speakers?: string[]
    artists?: string[]
  }
  
export interface Props {
    initialEvents: Event[]
  }

export interface EventCardProps {
    event: {
      id: string
      title: string
      schedule: { startDate: string; endDate: string }
      location: { address: string }
      images: { thumbnail: string }
    }
  }