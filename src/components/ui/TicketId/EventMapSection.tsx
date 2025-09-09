'use client';
import dynamic from 'next/dynamic';
const EventMap = dynamic(() => import('@/components/ui/EventMap'), {
    ssr: false,
});

interface Props {
    location: any;
}

export default function EventMapSection({ location }: Props) {
    const { coordinates, address } = location;

    if (!coordinates?.lat || !coordinates?.lng) {
        return (
            <div className="w-full h-72 flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-500 rounded-lg shadow-md px-4 py-6">
                No map available
            </div>
        );
    }

    return (
        <div
            id="coordinates"
            className="space-y-4 bg-white dark:bg-gray-700 shadow-md rounded-lg px-4 py-6 z-0"
        >
            <h2 className="text-xl font-bold">แผนที่</h2>
            <p>
                Lat: {coordinates.lat}, Lng: {coordinates.lng}
            </p>
            <EventMap
                lat={coordinates.lat}
                lng={coordinates.lng}
                address={address}
            />
        </div>
    );
}
