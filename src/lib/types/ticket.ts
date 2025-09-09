export interface Ticket {
    event_id: string;
    available: number;
    userid: string;
    payment: Payment[];
}

export interface Payment {
    pricing: string;
    status: string;
    created_at: string;
    channel: string;
}
