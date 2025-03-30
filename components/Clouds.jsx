'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Clouds({ isMobile }) {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    const cloudCount = isMobile ? 5 : 10;

    const generatedClouds = Array.from({ length: cloudCount }).map(
      (_, index) => ({
        id: index,
        size:
          (isMobile ? Math.random() * 8 + 5 : Math.random() * 10 + 10) + 'rem', // 1rem - 5rem for mobile, 10rem - 20rem for desktop
        duration: Math.random() * 10 + 10, // 10s - 20s animation
        top: Math.random() * 30 + 10, // Random vertical position (10% - 90%)
        delay: Math.random() * 5, // Random animation delay (0s - 5s)
      })
    );

    setClouds(generatedClouds);
  }, [isMobile]);

  return (
    <div className="relative top-0 left-0 w-full h-full overflow-hidden z-10">
      {clouds.map(({ id, size, duration, top, delay }) => (
        <Image
          key={id}
          width={500}
          height={500}
          src="/cloud.png"
          alt="Cloud"
          className="cloud absolute"
          style={{
            width: size,
            top: `${top}%`,
            animation: `moveCloud ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </div>
  );
}
