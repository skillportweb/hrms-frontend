import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from './../../Redux/ProfileSlice';
import { GetDepartmentById } from './../../Apis/apiHandlers';
import CompleteProfileLinks from './CompleteProfileLinks';

export default function UserProfile() {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.profile || {});

  const [departmentName, setDepartmentName] = useState('');

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    const fetchDepartment = async () => {
      if (user?.departmentId) {
        try {
          const res = await GetDepartmentById(user.departmentId);
          setDepartmentName(res?.data?.title || 'N/A');
        } catch {
          setDepartmentName('N/A');
        }
      }
    };
    fetchDepartment();
  }, [user?.departmentId]);

  if (isLoading) return <p className="p-4 text-gray-500">Loading user profile...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <>
      <CompleteProfileLinks />
       <hr className="mt-4" />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">

          <div className="bg-[#34495e] p-6 flex flex-col sm:flex-row items-center gap-4 text-white">
            <div className="w-20 h-20 rounded-full bg-white overflow-hidden flex items-center justify-center text-2xl font-bold uppercase shadow-md text-purple-600">
              {`${user?.firstname?.[0] || ''}${user?.lastname?.[0] || ''}`}
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-semibold">{user?.firstname} {user?.lastname}</h2>
              <p className="text-pink-200">{user?.designation}</p>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div><strong>ID :</strong> {user?.id}</div>
            <div><strong>Email :</strong> {user?.email}</div>
            <div><strong>Phone :</strong> {user?.phone}</div>
            <div><strong>Date of Birth :</strong> {new Date(user?.dob).toLocaleDateString('en-GB')}</div>
            <div><strong>Department :</strong> {user?.departmentName ? user.departmentName : "N/A"}</div>
            <div><strong>Current Payroll :</strong> ₹{Number(user?.currentPayroll).toLocaleString('en-IN')}</div>
            <div><strong>Promotion Date : </strong>
              {user?.promotionDate ? new Date(user.promotionDate).toLocaleDateString('en-GB') : 'N/A'}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
