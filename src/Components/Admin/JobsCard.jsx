import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { GetAlljobs, ActiveJob, DeactivateJob } from '../../Apis/apiHandlers'; 
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; 

export default function JobsCard() {
  const [jobs, setJobs] = useState([]);
  const role = parseInt(localStorage.getItem('role'), 10);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await GetAlljobs();
        console.log("====================", response.data);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error.message);
        toast.error("Failed to fetch jobs");
      }
    };

    fetchJobs();
  }, []);

  const toggleJobStatus = async (jobId, currentStatus) => {
    try {
      if (currentStatus) {
        await DeactivateJob(jobId);
        toast.warn("Job Deactivated");
      } else {
        await ActiveJob(jobId);
        toast.success("Job Activated");
      }

      const updatedJobs = jobs.map(job =>
        job.id === jobId ? { ...job, status: !currentStatus } : job
      );
      setJobs(updatedJobs);
    } catch (error) {
      console.error("Error updating job status:", error.message);
      toast.error("Failed to update job status");
    }
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-4'>
      {jobs.map((job) => (
        <div key={job.id} className="relative bg-white shadow-md p-4 rounded-lg">

          {/* Toggle button for Admins */}
          {role === 1 && (
            <div className="absolute top-3 right-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={job.status}
                  onChange={() => toggleJobStatus(job.id, job.status)}
                  className="sr-only"
                />
                <div className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${job.status ? 'bg-green-500' : 'bg-red-500'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${job.status ? 'translate-x-5' : ''}`} />
                </div>
              </label>
            </div>
          )}

          {/* Job Title */}
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            {job.jobTitle?.split(" ").slice(0, 20).join(" ")}
            {job.jobTitle?.split(" ").length > 20 && "..."}
          </h2>

          {/* Introduction */}
          <p className="text-gray-600 mb-4 text-sm">
            {job.introduction?.split(" ").slice(0, 30).join(" ")}
            {job.introduction?.split(" ").length > 30 && "..."}
          </p>

          <div className='flex justify-between items-center'>
            <div className="flex items-center gap-6 text-gray-600 text-sm mb-4">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-600" />
                <span>{job.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-blue-600" />
                <span>{job.employmentType}</span>
              </div>
            </div>
            <Link
              to={`/jobdetails/${job.id}`}
              className="border border-[#000] text-black pl-5 pr-5 py-1 text-center rounded-[30px] hover:bg-[#2c3e50] hover:text-white transition duration-300"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
