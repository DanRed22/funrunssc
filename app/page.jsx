import Headline from '@/components/Headline';
import Mechanics from '@/components/Mechanics';
import { Fragment } from 'react';

export default function Home() {
  return (
    <Fragment>
      <div>
        <Headline />
        <Mechanics />
      </div>
    </Fragment>
  );
}
