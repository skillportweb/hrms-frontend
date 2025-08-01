import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faTable } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { GetAllUsers } from '../../../Apis/apiHandlers';

export default function AttendanceTable() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await GetAllUsers();
        const userData = response?.users || [];
        setUsers(userData);
      } catch (err) {
        console.error("Failed to fetch users:", err.message);
      }
    };

    fetchUsers();
  }, []);

  const openCalendarModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const columns = [
    { name: 'ID', selector: row => row.id, width: '60px' },
    { name: 'First Name', selector: row => row.firstname || 'N/A' },
    { name: 'Last Name', selector: row => row.lastname || 'N/A' },
    { name: 'Email', selector: row => row.email || 'N/A' },
    { name: 'Designation', selector: row => row.designation || 'N/A' },
    {
      name: 'Attendance',
      cell: row => (
        <div className="flex items-center gap-4 text-lg cursor-pointer">
          <span className="text-blue-600">
            <FontAwesomeIcon icon={faCalendarAlt} onClick={openCalendarModal} />
          </span>
          <span className="text-green-600">
            <Link to={`/attendance-monthly-table/${row.id}`}>
              <FontAwesomeIcon icon={faTable} />
            </Link>
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 relative">
      <h3 className="text-lg font-semibold mb-4">Admin View – Attendance Table</h3>
      <hr className="mb-4" />

      <DataTable
        columns={columns}
        data={users}
        pagination
        highlightOnHover
        striped
        responsive
        noDataComponent="No users found"
      />

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50 px-4"
          onClick={closeModal}
        >
          <div onClick={(e) => e.stopPropagation()} className="bg-white p-4 rounded">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="w-full"
            />
            <p className="mt-3 text-sm text-center text-black">
              Selected Date: {selectedDate.toDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
