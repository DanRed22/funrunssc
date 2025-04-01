import Headline from '@/components/Headline';
import Mechanics from '@/components/Mechanics';
import MechanicsTreasure from '@/components/MechanicsTreasure';
import Navbar from '@/components/Navbar';
import { Fragment } from 'react';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center">
        <Navbar />
        <Headline />
        <Mechanics />
        <MechanicsTreasure />
        <Footer />
      </div>
    </Fragment>
  );
}
