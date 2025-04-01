'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className="bg-[#f0efa7] px-4 py-2 h-fit flex flex-col items-center w-full justify-between !z-30">
      <div className="flex flex-row items-center justify-center space-x-2">
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
      <p>
        Problems with the site? Send bugs, reports, or suggestions to:{' '}
        <a href="mailto:21103909@usc.edu.ph">21103909@usc.edu.ph</a>
      </p>
      <p>©USC SSC A.Y. 2024 - 2025</p>
    </div>
  );
}
