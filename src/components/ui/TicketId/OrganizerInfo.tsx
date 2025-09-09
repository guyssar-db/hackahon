'use client';
interface Props {
    organizer: any;
}

export default function OrganizerInfo({ organizer }: Props) {
    return (
        <div
            id="organizer"
            className="space-y-1 bg-white dark:bg-gray-700 shadow-md rounded-lg px-4 py-6"
        >
            <h2 className="text-xl font-bold">ผู้จัด</h2>
            <p>{organizer.name}</p>
            <p>{organizer.contact}</p>
            <p>{organizer.phone}</p>
        </div>
    );
}
