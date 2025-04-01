'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import Clouds from './Clouds';
import Image from 'next/image';
import TreasureChest from './TreasureChest';
import FormModal from './FormModal';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import ProgressTrackModal from './ProgressTrackModal';

export default function Headline() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1222);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize(); // Initial check
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    >
      <div id="headline" className="flex w-full h-fit text-center">
        {/* {showDialog && (
        <FormModal
          setShowDialog={setShowDialog}
          showDialog={showDialog}
          isMobile={isMobile}
        />
      )} */}
        <div className="absolute z-20 mt-[-5rem] portrait:mt-0 sm:mt-0  w-full justify-center h-full text-white">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-5xl font-bold text-[#1E3A8A] ">
              Virtual Fun Run & Treasure Hunt
            </h1>
            <p className="animate-pulse duration-[1] mt-4 text-2xl text-[#92cc42] drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
              Join the adventure today!
            </p>
            <div className="flex flex-col items-center justify-center !space-y-4">
              <button
                className="nes-btn is-primary !w-[16rem] h-[4rem] !text-3xl !my-4"
                onClick={() => {
                  //new tab
                  window.open(
                    'https://docs.google.com/forms/d/e/1FAIpQLScaoB7TY812u4V3UlnVzUOlUj4no81InFYj__bpm53ZUwMOyw/viewform?usp=sharing',
                    '_blank'
                  );
                }}
              >
                Register Here
              </button>
              <FormModal />
              <ProgressTrackModal />
            </div>
            {/* <button
            className="nes-btn is-success  mt-4 !w-[16rem] h-[4rem] !text-3xl"
            onClick={() => setShowDialog(!showDialog)}
          >
            Submit Progress
          </button> */}
            <TreasureChest />
          </div>
        </div>
        <Clouds className="absolute" isMobile={isMobile} />
        <Image
          src={isMobile ? '/background-mobile.png' : '/background.png'}
          alt="Background"
          width={1920}
          height={1080}
          className=" object-cover h-full w-full z-0"
          unoptimized
        />
      </div>
    </GoogleReCaptchaProvider>
  );
}
