import Headline from '@/components/Headline';
import Mechanics from '@/components/Mechanics';
import MechanicsTreasure from '@/components/MechanicsTreasure';
import { Fragment } from 'react';

export default function Home() {
  return (
    <Fragment>
      <div>
        <Headline />
        <Mechanics />
        <MechanicsTreasure />
      </div>
    </Fragment>
  );
}
