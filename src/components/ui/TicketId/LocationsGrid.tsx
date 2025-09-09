'use client';
import LocationCard from './LocationCard';

const locations = [
    {
        id: '1',
        name: 'สถานที่ A',
        description: 'รายละเอียดสถานที่ A',
        price: 100,
    },
    {
        id: '2',
        name: 'สถานที่ B',
        description: 'รายละเอียดสถานที่ B',
        price: 150,
    },
    {
        id: '3',
        name: 'สถานที่ C',
        description: 'รายละเอียดสถานที่ C',
        price: 200,
    },
    {
        id: '4',
        name: 'สถานที่ D',
        description: 'รายละเอียดสถานที่ D',
        price: 250,
    },
];

export default function LocationsGrid() {
    return (
        <div className="space-y-4 bg-white dark:bg-gray-700 shadow-md rounded-lg px-4 py-6 z-0">
            <p className="text-xl font-bold">ที่พักใกล้เคียง</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {locations.map((loc) => (
                    <LocationCard key={loc.id} location={loc} />
                ))}
            </div>
        </div>
    );
}
