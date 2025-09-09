export interface Ticket {
    id: string;
    event_id: string;
    userid: string;
    payment: Payment;
}

export interface Payment {
    pricing: string;
    status: string;
    created_at: string;
    channel: string;
}
