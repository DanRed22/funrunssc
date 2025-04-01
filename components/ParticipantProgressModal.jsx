'use client';
import React, { Fragment, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import moment from 'moment';
import { Button } from './ui/button';

function ParticipantProgressModal({ data, open = false, setOpen }) {
  const [currentPage, setCurrentPage] = useState(0); // Track the current page (set of 3 entries)
  const entriesPerPage = 10;

  // Calculate the total number of pages
  const totalPages = Math.ceil(data?.entries?.length / entriesPerPage);

  // Get the current slice of entries to show
  const currentEntries = data?.entries?.slice(
    currentPage * entriesPerPage,
    (currentPage + 1) * entriesPerPage
  );

  // Function to go to the next page
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case 'VERIFIED':
        return 'text-green-500'; // Green for VERIFIED
      case 'PENDING':
        return 'text-yellow-500'; // Yellow for PENDING
      case 'REJECTED':
        return 'text-red-500'; // Red for REJECTED
      default:
        return 'text-gray-500'; // Default gray color
    }
  };

  return (
    <Fragment>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={'border-black border-2'}>
          <DialogHeader>
            <DialogTitle className="text-3xl">
              Progress {data?.participant?.name}
            </DialogTitle>
            <DialogDescription className="text-sm">
              {' '}
              Your Email: {`[ ${data?.participant?.email} ]`}
              {!data?.participant && <p>No information to show</p>}
            </DialogDescription>

            <form>
              <div className="flex flex-col items-center  space-y-2 w-full h-[calc(100vh-20rem)]">
                <Table>
                  <TableCaption>
                    {data?.entries?.length > 0 && (
                      <p className="text-lg font-bold">
                        Total Verified Distance:{' '}
                        <span className="text-black">
                          {data?.totalVerifiedKm} Km
                        </span>
                      </p>
                    )}
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[1rem]">#</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Distance (Km)</TableHead>
                      <TableHead className="text-center">
                        Date Added (MM-DD-YYYY)
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentEntries?.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          No entries found.
                        </TableCell>
                      </TableRow>
                    )}
                    {currentEntries?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {index + 1 + currentPage * entriesPerPage}
                        </TableCell>
                        <TableCell>
                          <span className={getStatusClassName(item?.status)}>
                            {item?.status}
                          </span>
                        </TableCell>
                        <TableCell>{item?.distance} Km</TableCell>
                        <TableCell className=" justify-self-start">
                          {moment(item?.createdAt).format('MM-DD-YYYY')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-between mt-4 w-full">
                  <Button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={goToNextPage}
                    disabled={
                      currentPage === totalPages - 1 ||
                      currentEntries?.length === 0
                    }
                  >
                    Next
                  </Button>
                </div>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default ParticipantProgressModal;
