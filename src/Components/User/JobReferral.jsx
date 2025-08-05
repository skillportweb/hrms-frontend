import React from 'react';
import JobsCard from '../Admin/JobsCard';
import ActiveJobCard from './ActiveJobCard';

export default function JobReferral() {
  return (
    <>
      <div className="flex justify-between items-center mb-4 mt-4">
        <h1 className="text-lg font-semibold">Job Referral</h1>
        <input
          type="text"
          placeholder="Search jobs..."
          className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#2c3e50]"
        />
      </div>
      <hr/>
      <ActiveJobCard/>
    </>
  );
}
