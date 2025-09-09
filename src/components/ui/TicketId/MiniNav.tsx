'use client';
export default function MiniNav() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="sticky top-[65px] bg-white dark:bg-gray-700 shadow-md rounded-lg px-4 py-2 flex justify-between items-center transition-all duration-300">
      <div className="w-full">
        <button onClick={() => scrollToSection('buy-ticket')} className="px-3 py-1 w-full bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer">
          To Buy Ticket
        </button>
      </div>
    </div>
  );
}
