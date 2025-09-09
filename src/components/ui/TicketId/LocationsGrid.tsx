'use client';
import LocationCard from './LocationCard';

const locations = [
  { id: '1', name: 'สถานที่ A', description: 'รายละเอียดสถานที่ A', price: 100 },
  { id: '2', name: 'สถานที่ B', description: 'รายละเอียดสถานที่ B', price: 150 },
  { id: '3', name: 'สถานที่ C', description: 'รายละเอียดสถานที่ C', price: 200 },
  { id: '4', name: 'สถานที่ D', description: 'รายละเอียดสถานที่ D', price: 250 },
];

export default function LocationsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {locations.map((loc) => (
        <LocationCard key={loc.id} location={loc} />
      ))}
    </div>
  );
}
