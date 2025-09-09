'use client';
import { useState } from 'react';

interface Location {
    id: string;
    name: string;
    description: string;
    price: number;
}

interface Props {
    location: Location;
}

export default function LocationCard({ location }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                onClick={() => setOpen(true)}
                className="cursor-pointer p-4 border rounded-lg bg-white shadow hover:shadow-lg transition-colors duration-300 text-blue-700 hover:bg-blue-50"
            >
                <h3 className="text-lg font-bold">{location.name}</h3>
            </div>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg p-6 w-80 max-w-full text-blue-700 shadow-lg relative">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-2 right-2 text-blue-500 hover:text-blue-700 font-bold"
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-2">
                            {location.name}
                        </h2>
                        <p className="mb-4">{location.description}</p>
                        <p className="font-semibold">
                            ราคา: {location.price} บาท
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
