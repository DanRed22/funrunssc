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
import TutorialStravaLink from './TutorialStravaLink';
import useRecaptcha from '@/hooks/useCaptcha';
import axios from 'axios';
import { ImSpinner } from 'react-icons/im';

function FormModal({ className = '' }) {
  const [captchaToken, setCaptchaToken] = useState('');
  const [loading, setLoading] = useState(false);

  const executeRecaptcha = useRecaptcha(); // Get recaptcha function without auto-executing

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!executeRecaptcha) return alert('Recaptcha not ready');

    const token = await executeRecaptcha('submit_form'); // Execute when needed
    // setCaptchaToken(token);

    const name = event.target.name.value;
    const email = event.target.email.value;
    const distance = event.target.distance.value;
    const stravaLink = event.target.strava_link.value;

    const response = await axios.post('/api/verify-recaptcha', {
      token,
    });

    if (response.data.success) {
      try {
        const res = await axios.post('/api/entry', {
          name,
          email: email,
          distance,
          link: stravaLink,
        });
        console.log('RESPONSE', res);
        if (res.status === 201) {
          alert('✅ Submission successful! Thank you for your participation.');
          window.location.reload();
        } else {
          alert(`❌ Submission failed! ${res.data}`);
        }
      } catch (error) {
        alert(
          `❌ Submission failed! ${
            error.response?.data?.error
              ? error.response.data.error
              : error.message
          }`
        );
        console.error('Error submitting form:', error.error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('❌ ReCaptcha Verification Error! Please contact administrator.');
      setLoading(false);

      return;
    }
  };
  return (
    <Fragment>
      <Dialog>
        <DialogTrigger
          className={`nes-btn is-success !w-[16rem] h-[4rem] !text-3xl ${className}`}
        >
          Submit Progress
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl">Submit Your Progress</DialogTitle>
            <DialogDescription className="text-sm">
              {' '}
              Please submit your progress for the Virtual Fun Run. Be sure it is
              within April 2, 2025 to April 26, 2025.
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
                    id="email"
                    className="nes-input"
                    placeholder="Registered Email"
                    required
                  />
                </div>

                <div className="nes-field w-full">
                  <input
                    type="number"
                    id="distance"
                    className="nes-input"
                    placeholder="Distance Travelled (KM)"
                    step="any"
                    min="0"
                    inputMode="decimal"
                    pattern="\\d*(\\.\\d+)?"
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
                    className=" !flex !flex-row !items-center !justify-center nes-btn is-success mt-4 !w-[16rem] h-[4rem] !text-3xl !my-4"
                  >
                    Submit
                    {loading && (
                      <ImSpinner
                        size={20}
                        className={'animate-spin ease-linear !bg-none ml-2'}
                      />
                    )}
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
