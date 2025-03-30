import React from 'react';
import TextContainer from './TextContainer';

export default function Mechanics() {
  const mechanics = [
    '1. Participants  must track their progress via the Strava application to track their distance traveled and accumulate their total from March 31 to April 24. ',
    '2. Participants may complete their kilometer bracket at their own pace, location, and preferred time. Once completed, you may submit your final distance through the official submission form.',
    '3. The Treasure Hunt is a fun way to progress towards their running goal while searching for prizes. ',
    '4. Top 3 finishers will win cash prizes. All participants shall receive an e-certificate for participating on the event. This will be sent via the email provided during registration',
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
