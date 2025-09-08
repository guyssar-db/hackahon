import { Navbar } from '@/components/navbar';
import { TicketGrid } from '@/components/ticket-grid';
import { TicketFilters } from '@/components/ticket-filters';

export default function TicketsPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Header Section */}
            <section className="bg-gradient-to-r from-cyan-500 to-blue-600 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
                        ซื้อตั๋วอีเวนต์
                    </h1>
                    <p className="text-lg text-white/90 text-pretty">
                        เลือกอีเวนต์ที่คุณสนใจและจองตั๋วได้เลย
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters Sidebar */}
                        <div className="lg:w-1/4">
                            <TicketFilters />
                        </div>

                        {/* Events Grid */}
                        <div className="lg:w-3/4">
                            <TicketGrid />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
