import React from 'react';
import { Fragment } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function TutorialStravaLink() {
  return (
    <Fragment>
      <Dialog>
        <DialogTrigger>
          <Image
            src="info-icon.png"
            alt="Info Icon"
            width={20}
            height={20}
            unoptimized
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl">
              Tutorial: Sharing Activities in Strava
            </DialogTitle>

            <Image
              src="tutorial-share-strava.png"
              alt="Info Icon"
              width={1080}
              height={1920}
              unoptimized
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
