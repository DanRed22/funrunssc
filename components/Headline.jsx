'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import Clouds from './Clouds';
import Image from 'next/image';

export default function Headline() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize(); // Initial check
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  return (
    <div id="headline" className="relative h-screen text-center">
      <Clouds isMobile={isMobile} />
      <Image
        src={isMobile ? '/background-mobile.png' : '/background.png'}
        alt="Background"
        width={1920}
        height={1080}
        className=" absolute top-0 left-0 object-cover h-full w-full z-0"
        unoptimized
      />
      <div className="absolute top-[-20%] z-20 w-full justify-center h-full text-white">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl font-bold text-[#1E3A8A] ">
            Virtual Fun Run & Treasure Hunt
          </h1>
          <p className="animate-pulse duration-[1] mt-4 text-2xl text-[#92cc42] drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
            Join the adventure today!
          </p>
          <button className="nes-btn is-primary mt-4 !w-[16rem] h-[4rem] !text-3xl !my-4">
            Get Started
          </button>
          <button className="nes-btn is-success  mt-4 !w-[16rem] h-[4rem] !text-3xl">
            Submit Progress
          </button>
        </div>
      </div>
    </div>
  );
}
