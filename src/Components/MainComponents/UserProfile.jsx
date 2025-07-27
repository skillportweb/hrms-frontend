import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from './../../Redux/ProfileSlice';

export default function UserProfile() {
  const dispatch = useDispatch();

  const { user, isLoading, error } = useSelector((state) => state.profile || {});

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (isLoading) return <p>Loading user profile...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      {user ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><strong>First Name:</strong> {user.firstname}</div>
          <div><strong>Last Name:</strong> {user.lastname}</div>
          <div><strong>Email:</strong> {user.email}</div>
          <div><strong>Phone:</strong> {user.phone}</div>
          <div><strong>Date of Birth:</strong> {user.dob}</div>
          <div><strong>Designation:</strong> {user.designation}</div>
          <div><strong>Role:</strong> {user.role === 1 ? 'Admin' : 'User'}</div>
          <div><strong>Approved:</strong> {user.approved ? 'Yes' : 'No'}</div>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
}
