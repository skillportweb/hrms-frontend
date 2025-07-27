import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faTable } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function AttendanceTable() {
    const [data] = useState([
        {
            id: 1,
            fastname: 'John ',
            lastname: "Doe",
            email: 'john@example.com',
            designation: 'Frontend Developer',
        },
        {
            id: 2,
            fastname: 'Jane Smith',
            lastname: "Smith",
            email: 'jane@example.com',
            designation: 'Backend Developer',
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const openCalendarModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const columns = [
        { name: 'ID', selector: row => row.id, width: '60px' },
        { name: 'Fast Name', selector: row => row.fastname },
        { name: 'Last Name', selector: row => row.lastname },
        { name: 'Email', selector: row => row.email },
        { name: 'Designation', selector: row => row.designation },
        {
            name: 'Attendance',
            cell: () => (
                <div className="flex items-center gap-4 text-lg cursor-pointer">
                    <span className="text-blue-600">
                        <FontAwesomeIcon icon={faCalendarAlt} onClick={openCalendarModal} />
                    </span>
                    <span className="text-green-600">
                        <Link to="/attendance-monthly-table">
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

            <hr/>

            <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
                striped
                responsive
            />

            {showModal && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50 px-4"
                    onClick={closeModal}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                    >

                        <Calendar
                            onChange={setSelectedDate}
                            value={selectedDate}
                            className="w-full"
                        />

                        <p className="mt-3 text-sm text-white text-center">
                            Selected Date: {selectedDate.toDateString()}
                        </p>
                    </div>
                </div>
            )}



        </div>
    );
}
