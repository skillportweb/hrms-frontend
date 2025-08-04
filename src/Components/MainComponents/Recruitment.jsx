import React from "react";
import { Link } from "react-router-dom";
import JobsCard from "../Admin/JobsCard";

export default function Recruitment() {
  return (
    <>
      <div class="flex justify-between items-center mb-4 mt-4">
        <h1 class="text-lg font-semibold">Recruitment</h1>
        <Link to="/recruitment/add-jobs-form" class="text-white bg-[#2c3e50] px-6 py-2 rounded hover:bg-[#43596f] transition text-[15px]">
          Add Jobs
        </Link>
      </div>
      <hr />
      <div>
        <JobsCard />
      </div>

    </>
  );
}
