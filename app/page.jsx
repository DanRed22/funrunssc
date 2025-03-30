import Headline from '@/components/Headline';
import Sponsors from '@/components/Sponsors';
import Image from 'next/image';
import { Fragment } from 'react';

export default function Home() {
  return (
    <Fragment>
      <div>
        <Headline />
        <Sponsors />
      </div>
    </Fragment>
  );
}
