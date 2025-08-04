import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { GetActivejobs } from '../../Apis/apiHandlers';
import { Link } from 'react-router-dom';

export default function ActiveJobCard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await GetActivejobs();
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error.message);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-4'>
      {jobs.map((job) => (
        <div key={job.id} className="relative bg-white shadow-md p-4 rounded-lg">
          
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
