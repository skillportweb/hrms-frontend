import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetDepartmentById } from '../../Apis/apiHandlers';
import DepartmentMemberList from './DepartmentMemberList';
import DepartmentMembersDataTable from './DepartmentMembersDataTable';

export default function DepartmentDetails() {
  const { id } = useParams(); //  this is the departmentId from URL
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDepartment() {
      try {
        const response = await GetDepartmentById(id);
        setDepartment(response);
      } catch (err) {
        setError("Failed to fetch department details.");
      } finally {
        setLoading(false);
      }
    }

    fetchDepartment();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="relative bg-white shadow-lg rounded-lg p-6 w-full max-w-none overflow-hidden">
        {/* Background design */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-green-300 rounded-full opacity-30 transform rotate-12 z-0"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-300 rounded-full opacity-20 z-0"></div>

        {/* Department Info */}
        <div className="relative z-10 space-y-4">
          <h2 className="lg:text-3xl text-2xl font-extrabold text-gray-800">{department?.title}</h2>
          <p><strong className="text-gray-600">Head:</strong> {department?.headName}</p>
          <p><strong className="text-gray-600">Description:</strong> {department?.description}</p>
          <p>
            <strong className="text-gray-600">Status:</strong>{' '}
            <span className={department?.status === 1 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
              {department?.status === 1 ? "Active" : "Inactive"}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-4 p-2">
        {/*  Send departmentId as a prop */}
        <DepartmentMemberList departmentId={id} />
      </div>
      <hr />
      <div className='mt-4'>
        <DepartmentMembersDataTable departmentId={id} />
      </div>

    </div>
  );
}
