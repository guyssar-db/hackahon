export interface EventSystem {
    eventSystem: {
        systemInfo: {
            name: string;
            version: string;
            lastUpdated: string;
            totalEvents: number;
        };
        categories: Category[];
        events: Event[];
        metadata: {
            pagination: Pagination;
            filters: Filters;
            searchableFields: string[];
            sortOptions: SortOption[];
        };
    };
}

export interface Category {
    id: string;
    name: string;
    description: string;
    color: string;
}

export interface Event {
    name: ReactNode;
    id: string;
    title: string;
    description: string;
    category: string;
    type: string;
    status: 'active' | 'inactive' | string;
    featured: boolean;
    organizer: Organizer;
    schedule: Schedule;
    location: Location;
    pricing: Record<string, number | string>;
    capacity: Capacity;
    images: Images;
    tags: string[];
    requirements?: string[];
    speakers?: Speaker[];
    tracks?: string[];
    includes?: string[];
    artists?: Artist[];
    distances?: string[];
    activities?: string[];
}

export interface Organizer {
    name: string;
    contact: string;
    phone: string;
}

export interface Schedule {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    timezone: string;
}

export interface Location {
    type: 'onsite' | 'online' | 'hybrid' | string;
    venue: string;
    address: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    onlineLink?: string;
}

export interface Capacity {
    max: number;
    registered: number;
    available: number;
}

export interface Images {
    banner: string;
    thumbnail: string;
    gallery: string[];
}

export interface Speaker {
    name: string;
    title: string;
    company: string;
    bio: string;
    image: string;
}

export interface Artist {
    name: string;
    instrument: string;
    country: string;
}

export interface Pagination {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
}

export interface Filters {
    categories: string[];
    priceRanges: {
        min: number;
        max: number | null;
    }[];
    locations: string[];
    dateRanges: string[];
}

export interface SortOption {
    field: string;
    order: 'asc' | 'desc' | string;
    label: string;
}
