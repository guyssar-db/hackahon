import Link from "next/link"; 
import LayoutMain from "@/layouts/LayoutMain";
import { type Event } from "@/service/EventSystem";

export default async function ShopPage() {
  const res = await fetch("http://54.169.154.143:3082/events");
  const data = await res.json();

  const Tricket: Event[] = Object.values(data[0]);

  return (
    <LayoutMain>
      <div className="p-6 bg-gray-100 dark:bg-gray-700 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Shop
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {Tricket.map((ev) => (
            <Link
              key={ev.id}
              href={`/shop/${ev.id}`}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={ev.images?.banner || ev.images?.thumbnail || '/placeholder.png'}
                alt={ev.title}
                className="w-full h-48 object-contain p-4 bg-gray-50"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                  {ev.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mt-2 line-clamp-3">
                  {ev.description}
                </p>
              </div>

              <div className="flex justify-between items-center p-4">
                {/* แสดงราคาทุกแบบ */}
                <p className="mt-2 font-bold text-blue-600 dark:text-blue-400">
                  {ev.pricing && Object.values(ev.pricing).map((price, i) => (
                    <span key={i} className="mr-2">฿{price}</span>
                  ))}
                </p>

                <p className="mt-2 font-bold text-gray-600 dark:text-gray-400">
                  ★ {ev.location?.venue || 'Online'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </LayoutMain>
  );
}
