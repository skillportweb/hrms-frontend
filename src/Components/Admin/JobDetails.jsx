import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GetJobDetails } from '../../Apis/apiHandlers';
import ReferralJobModel from './AdminModels/ReferralJobModel';

export default function JobDetails() {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Modal state
  const [isReferralOpen, setIsReferralOpen] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await GetJobDetails(id);
        setJobData(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    const role = parseInt(localStorage.getItem('role'), 10);
    setUserRole(role);

    fetchJobDetails();
  }, [id]);

  if (!jobData) {
    return <div className="p-4">Loading...</div>;
  }

  const isRoleZero = userRole === 0;

  return (
    <>
      <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-[#E2E6EE]">
        <h1 className="text-xl font-semibold text-gray-800">{jobData.jobTitle}</h1>

        {/* Top right button: show Referral for role 0, else Edit */}
        {isRoleZero ? (
          <button
            onClick={() => setIsReferralOpen(true)}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Referral Anyone
          </button>
        ) : (
          <Link
            to={`/update-job/${jobData.id}`}
            className="border border-[#000] px-6 py-2 rounded bg-[#2c3e50] hover:bg-[#3b4c5c] text-white transition duration-300"
          >
            Edit
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 mt-4 p-4">
        <div className="sm:col-span-8">
          <div>
            <h2 className="text-gray-800 font-medium mb-2">Introduction</h2>
            <p className="text-gray-600 text-[14px] tracking-wider mb-4">{jobData.introduction}</p>
          </div>

          <div>
            <h2 className="text-gray-800 font-medium mb-2">Role and Responsibilities</h2>
            <p className="text-gray-600 text-[14px] tracking-wider mb-4">{jobData.responsibilities}</p>
          </div>

          <div>
            <h2 className="text-gray-800 font-medium mb-2">Education</h2>
            <p className="text-gray-600 text-[14px] tracking-wider mb-4">{jobData.education}</p>
          </div>

          <div>
            <h2 className="text-gray-800 font-medium mb-2">Technical and Professional Expertise</h2>
            <p className="text-gray-600 text-[14px] tracking-wider mb-4">{jobData.skills}</p>
          </div>
        </div>

        <div className="sm:col-span-4">
          <div className="space-y-5 text-sm text-gray-700">
            <Info label="Job Title" value={jobData.jobTitle} />
            <Info label="Job ID" value={jobData.jobId} />
            <Info label="City/Township/Village" value={jobData.city} />
            <Info label="State/Province" value={jobData.state} />
            <Info label="Country" value={jobData.country} />
            <Info label="Work Arrangement" value={jobData.workArrangement} />
            <Info label="Area of Work" value={jobData.areaOfWork} />
            <Info label="Employment Type" value={jobData.employmentType} />
            <Info label="Position Type" value={jobData.positionType} />
            <Info label="Travel Required" value={jobData.travelRequired} />
            <Info label="Shift" value={jobData.shift} />

            {/* Sidebar button: Referral or Edit based on role */}
            {isRoleZero ? (
              <button
                onClick={() => setIsReferralOpen(true)}
                className="w-full text-center bg-green-600 px-6 py-2 rounded text-white hover:bg-green-700 transition"
              >
                Referral Anyone
              </button>
            ) : (
              <Link
                to={`/update-job/${jobData.id}`}
                className="border w-full sm:w-auto block text-center border-[#000] px-6 py-2 rounded bg-[#2c3e50] hover:bg-[#3b4c5c] text-white transition duration-300"
              >
                Edit
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Modal (open when button clicked) */}
      <ReferralJobModel
        isOpen={isReferralOpen}
        onClose={() => setIsReferralOpen(false)}
        jobId={jobData.id}
      />
    </>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-800 font-medium mb-1">{label}</p>
      <p className="text-gray-600 text-xs uppercase tracking-wider">{value}</p>
    </div>
  );
}
