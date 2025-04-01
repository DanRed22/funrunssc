'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export default function TreasureChest() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Function to trigger the shake effect
  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 1000); // Shake duration
  };

  // Random shake effect every 5-10 seconds
  useEffect(() => {
    const interval = setInterval(triggerShake, Math.random() * 3000 + 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 my-4">
      <div
        className={clsx(
          ' transition-all duration-200',
          isShaking && 'animate-shake'
        )}
        onClick={() => {
          setIsOpen(!isOpen);
          triggerShake(); // Shake on click
          alert('Treasures will be available soon! 🎉'); // Alert for treasure found
        }}
      >
        <Image
          src={'/chest.png'}
          alt="Treasure Chest"
          width={100}
          height={100}
          className="hover:drop-shadow-[0_0_10px_rgb(255,215,0)] bg-transparent"
          unoptimized
        />
      </div>
    </div>
  );
}
