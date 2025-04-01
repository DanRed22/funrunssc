import React from 'react';
import TextContainer from './TextContainer';
import Image from 'next/image';

export default function Mechanics() {
  const mechanics = [
    'Participants must track their progress via the Strava application to track their distance traveled and accumulate their total from April 02 to April 26. ',
    'Participants may complete their kilometer bracket at their own pace, location, and preferred time. Once completed, you may submit your final distance through the official submission form.',
    'Join the fun and unlock rewards by participating in weekly running quests. At the same time, there will be a Treasure Hunt which is a fun way to progress towards your running goal while searching for prizes. ',
    'Top 3 finishers per kilometer tier WILL WIN CASH PRIZES. All participants shall receive an e-certificate for participating in the event. This will be sent through the email address provided during the registration.',
  ];
  return (
    <div
      id="mechanics
    "
      className="p-12 !w-full flex flex-col items-center justify-center bg-[#f0efa7] text-black text-2xl font-bold"
    >
      <div className="nes-container with-title is-centered flex flex-col items-center justify-center !p-8">
        <p className="text-5xl text-center !mb-8">Virtual Run Mechanics</p>
        {mechanics.map((item, index) => (
          <TextContainer
            key={index}
            message={item}
            className={'my-4 border-black w-[80%] text-start p-4'}
          />
        ))}
      </div>
    </div>
  );
}
