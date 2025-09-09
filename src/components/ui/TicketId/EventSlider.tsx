'use client';
import { useState } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  title: string;
}

export default function EventSlider({ images, title }: Props) {
  const [current, setCurrent] = useState(0);

  const handleNext = () => setCurrent((current + 1) % images.length);
  const handlePrev = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
      {images[0] ? (
        <Image src={images[current]} alt={title} fill sizes="100vw" className="object-cover rounded-lg" />
      ) : (
        <Image src="/31343C.svg" alt="no image" fill sizes="100vw" className="object-cover rounded-lg" />
      )}

      {images.length > 1 && (
        <>
          <button onClick={handlePrev} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/50 hover:bg-white/80 dark:hover:bg-gray-700 text-black dark:text-white p-2 rounded-full cursor-pointer">❮</button>
          <button onClick={handleNext} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/50 hover:bg-white/80 dark:hover:bg-gray-700 text-black dark:text-white p-2 rounded-full cursor-pointer">❯</button>
        </>
      )}
    </div>
  );
}
