'use client';
import React, { Fragment, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import TutorialStravaLink from './TutorialStravaLink';
import useRecaptcha from '@/hooks/useCaptcha';
import axios from 'axios';

function FormModal() {
  const [captchaToken, setCaptchaToken] = useState('');

  const executeRecaptcha = useRecaptcha(); // Get recaptcha function without auto-executing

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!executeRecaptcha) return alert('Recaptcha not ready');

    const token = await executeRecaptcha('submit_form'); // Execute when needed
    setCaptchaToken(token);

    const name = event.target.name.value;
    const playerId = event.target.player_id.value;
    const distance = event.target.distance.value;
    const stravaLink = event.target.strava_link.value;

    const response = await axios.post('/api/verify-recaptcha', {
      token,
    });

    if (response.data.success) {
      try {
        const res = await axios.post('/api/entry', {
          name,
          userId: playerId,
          distance,
          link: stravaLink,
        });
        if (res.status === 201) {
          alert('✅ Submission successful! Thank you for your participation.');
          window.location.reload();
        } else if (status === 404) {
          alert('❌ User not in database yet! Please contact administrator.');
        } else if (res.status === 400) {
          alert('❌ Missing required fields! Please fill in all fields.');
        } else if (res.status === 500) {
          alert('❌ Internal Server Error! Please try again later.');
        } else {
          alert(`❌ Submission failed! ${res.error}`);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      alert('❌ ReCaptcha Verification Error! Please contact administrator.');

      return;
    }
  };
  return (
    <Fragment>
      <Dialog>
        <DialogTrigger className="nes-btn is-success mt-4 !w-[16rem] h-[4rem] !text-3xl">
          Submit Progress
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl">Submit Your Progress</DialogTitle>
            <DialogDescription className="text-sm">
              {' '}
              Please submit your progress for the Virtual Fun Run.
            </DialogDescription>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center justify-center space-y-2 w-full">
                <div className="nes-field w-full">
                  <input
                    type="text"
                    id="name"
                    className="nes-input"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="nes-field w-full">
                  <input
                    type="text"
                    id="player_id"
                    className="nes-input"
                    placeholder="Player ID"
                    required
                  />
                </div>

                <div className="nes-field w-full">
                  <input
                    type="number"
                    id="distance"
                    className="nes-input"
                    placeholder="Distance Travelled (KM)"
                    required
                  />
                </div>

                <div className="nes-field w-full flex flex-row">
                  <input
                    type="text"
                    id="strava_link"
                    className="nes-input"
                    placeholder="Strava Activity Link"
                    required
                  />
                  <div className="flex items-center justify-center ml-2">
                    <TutorialStravaLink />
                  </div>
                </div>

                <div className="space-x-0 space-y-0 flex flex-col justify-center items-center w-full">
                  <button
                    type="submit"
                    className="nes-btn is-success mt-4 !w-[16rem] h-[4rem] !text-3xl !my-4"
                  >
                    Submit
                  </button>
                  <p className="text-xs text-center text-orange-500">
                    Please make sure the information is correct before
                    submitting, else your progress will be invalidated.
                  </p>
                </div>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default FormModal;
