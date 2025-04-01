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
import useRecaptcha from '@/hooks/useCaptcha';
import axios from 'axios';
import { ImSpinner } from 'react-icons/im';
import ParticipantProgressModal from './ParticipantProgressModal';

function ProgressTrackModal() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [showData, setShowData] = useState(false);

  const executeRecaptcha = useRecaptcha(); // Get recaptcha function without auto-executing

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!executeRecaptcha) return alert('Recaptcha not ready');

    const token = await executeRecaptcha('submit_form'); // Execute when needed
    // setCaptchaToken(token);

    const searchField = event.target.searchField.value;
    const response = await axios.post('/api/verify-recaptcha', {
      token,
    });

    if (response.data.success) {
      try {
        const res = await axios.get('/api/entry/search', {
          params: {
            searchField,
          },
        });
        if (res.status === 200 && res.data && res.data.participant) {
          setData(res.data);
          setShowData(true);
        } else {
          alert('❌ No data found for the provided search field.');
        }
      } catch (error) {
        alert(
          `❌ Search failed! ${
            error.response?.data?.error
              ? error.response.data.error
              : error.message
          }`
        );
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
      <ParticipantProgressModal
        data={data}
        open={showData}
        setOpen={setShowData}
      />

      <Dialog>
        <DialogTrigger className="nes-btn is-warning !w-[16rem] h-[4rem] !text-3xl">
          Track Progress
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl">Track Your Progress</DialogTitle>
            <DialogDescription className="text-sm">
              {' '}
              Please provide your registered email address.
            </DialogDescription>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center justify-center space-y-2 w-full">
                <div className="nes-field w-full">
                  <input
                    type="text"
                    id="searchField"
                    className="nes-input"
                    placeholder="Your name"
                    required
                  />
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
                </div>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default ProgressTrackModal;
