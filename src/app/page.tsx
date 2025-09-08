import BannerHome from '@/components/ui/bannerHome';
import LayoutMain from '@/layouts/LayoutMain';
import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon } from '@heroicons/react/24/outline';
import AuthButtons from '@/components/AuthButtons';

export default function Home() {
    const eventsData = {
        '0': {
            id: 'evt_001',
            title: 'Bangkok Marathon 2025',
            schedule: { startDate: '2025-11-10', endDate: '2025-11-10' },
            location: { venue: 'Sanam Luang' },
            images: {
                thumbnail:
                    'https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
        },
        '1': {
            id: 'evt_002',
            title: 'Thailand Tech Conference 2025',
            schedule: { startDate: '2025-11-20', endDate: '2025-11-22' },
            location: { venue: 'BITEC Bangna' },
            images: {
                thumbnail:
                    'https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
        },
        '2': {
            id: 'evt_003',
            title: 'Bangkok Business Networking Night',
            schedule: { startDate: '2025-09-25', endDate: '2025-09-25' },
            location: { venue: 'Lebua State Tower' },
            images: {
                thumbnail:
                    'https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
        },
        '3': {
            id: 'evt_004',
            title: 'Bangkok Business Networking Night',
            schedule: { startDate: '2025-09-25', endDate: '2025-09-25' },
            location: { venue: 'Lebua State Tower' },
            images: {
                thumbnail:
                    'https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
        },
        '4': {
            id: 'evt_005',
            title: 'Bangkok Business Networking Night',
            schedule: { startDate: '2025-09-25', endDate: '2025-09-25' },
            location: { venue: 'Lebua State Tower' },
            images: {
                thumbnail:
                    'https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
        },
        '5': {
            id: 'evt_006',
            title: 'Bangkok Business Networking Night',
            schedule: { startDate: '2025-09-25', endDate: '2025-09-25' },
            location: { venue: 'Lebua State Tower' },
            images: {
                thumbnail:
                    'https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
        },
    };

    return (
        <LayoutMain>
            <div className="min-h-[calc(100vh-65px)] flex flex-col items-center mt-[65px] bg-gray-100">
                {/* Banner */}
                <section className="flex flex-col items-center bg-gray-400 w-full p-5">
                    <div className="w-[90%] lg:w-[60%]">
                        <BannerHome />
                    </div>
                </section>

                {/* popular */}
                <section className="flex flex-col justify-center w-[86%] p-4 pt-10">
                    <p className="text-4xl py-5">ขายดีที่สุดในตอนนี้</p>

                    <div className="flex gap-6 w-full overflow-x-scroll hide-scrollbar">
                        {Object.values(eventsData).map((event, index) => (
                            <Link
                                key={`${event.id}-${index}`} // ใช้ index เพิ่มเติมเพื่อความ unique
                                href={`/ticket/${event.id}`}
                                className="min-w-[180px] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col items-center bg-white"
                            >
                                <div className="w-full h-48 relative">
                                    <Image
                                        src={event.images.thumbnail}
                                        alt={event.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover"
                                    />
                                </div>

                                <div className="p-4 w-full flex flex-col items-center">
                                    <p className="text-sm text-gray-500 mb-2 text-center">
                                        {new Date(
                                            event.schedule.startDate,
                                        ).toLocaleDateString('th-TH', {
                                            day: '2-digit',
                                            month: 'short',
                                        })}{' '}
                                        -{' '}
                                        {new Date(
                                            event.schedule.endDate,
                                        ).toLocaleDateString('th-TH', {
                                            day: '2-digit',
                                            month: 'short',
                                        })}
                                    </p>

                                    <h1 className="text-md font-bold text-center line-clamp-2">
                                        {event.title}
                                    </h1>
                                    <div className="w-full">
                                        <p className=" flex justify-start text-sm  text-gray-600  w-full line-clamp-1">
                                            <MapPinIcon width={20} />{' '}
                                            {event.location.venue}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
            <h1>Better Auth + SQLite</h1>
            <main className="p-8">
                <h1>Better Auth + SQLite</h1>
                <AuthButtons />
            </main>
        </LayoutMain>
    );
}
