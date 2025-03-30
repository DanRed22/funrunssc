import React from 'react';
import TextContainer from './TextContainer';

export default function MechanicsTreasure() {
  const mechanics = [
    "1. Participants must track their progress via Strava from the event's start date to the end date.",
    '2. Participants may complete their kilometer bracket at their own pace, location, and preferred time',
    '3. The Treasure Hunt is a fun way to progress towards their running goal while searching for prizes.',
    '4. Top 3 finishers will win cash prizes.',
  ];
  return (
    <div
      id="mechanics
    "
      className="p-12 !w-full flex flex-col items-center justify-center bg-[#f0efa7] text-black text-2xl font-bold"
    >
      <div className="nes-container with-title is-centered flex flex-col items-center justify-center !p-8">
        <p className="text-5xl text-center !mb-8">Treasure Hunt Mechanics</p>
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
