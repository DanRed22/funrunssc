'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="bg-[#f0efa7] px-4 py-2 h-fit flex flex-col items-center w-full justify-between !top-0 !z-30">
      <div className="flex flex-row items-center justify-center space-x-2">
        <Image
          src="logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="!rounded-full !object-cover "
          priority
          unoptimized
        />
        <Image
          src="ssc-logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="!rounded-full !object-cover mt-[-0.3rem]"
          priority
          unoptimized
        />
      </div>
      <div className="flex flex-row !justify-center !items-center !space-x-4 w-full !text-md">
        <Button className="w-18" onClick={() => scrollToTop()}>
          Home
        </Button>
        <Button
          className="w-18"
          onClick={() => {
            handleScroll('mechanics');
          }}
        >
          Mechanics
        </Button>
        <Button
          className="w-18"
          onClick={() => {
            handleScroll('events');
          }}
        >
          Events
        </Button>
        <Button
          className="w-18"
          onClick={() => {
            handleScroll('about');
          }}
        >
          About
        </Button>
      </div>
    </div>
  );
}
