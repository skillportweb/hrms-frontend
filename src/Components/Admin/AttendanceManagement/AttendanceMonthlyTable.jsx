import React from 'react';
import DataTable from 'react-data-table-component';
import { FaCheck, FaTimes } from 'react-icons/fa';

const attendanceData = [
    {
        id: 1,
        month: 'January',
        days: [0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    },
    {
        id: 2,
        month: 'February',
        days: [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    },
    {
        id: 3,
        month: 'March',
        days: [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0],
    },
];

const generateDayColumns = () => {
    return Array.from({ length: 31 }, (_, index) => ({
        name: (index + 1).toString(),
        center: true,
        width: '50px',
        cell: row =>
            row.days[index] === 1 ? (
                <FaCheck className="text-green-600" />
            ) : (
                <FaTimes className="text-red-500" />
            ),
    }));
};

const columns = [
    {
        name: 'MONTH',
        selector: row => row.month,
        sortable: true,
        minWidth: '160px',
    },
    ...generateDayColumns(),
    {
        name: 'Work',
        selector: row => row.days.filter(day => day === 1).length,
        center: true,
        width: '80px',
        cell: row => (
            <span className="font-semibold text-blue-700">
                {row.days.filter(day => day === 1).length}
            </span>
        ),
    },
    {
        name: 'Holiday',
        selector: row => row.days.filter(day => day === 0).length,
        center: true,
        width: '90px',
        cell: row => (
            <span className="font-semibold text-red-600">
                {row.days.filter(day => day === 0).length}
            </span>
        ),
    },
];

export default function AttendanceMonthlyTable() {
    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Monthly Attendance Table</h3>
            <hr />
            <div className="overflow-x-auto mt-5">
                <DataTable
                    columns={columns}
                    data={attendanceData}
                    dense
                    responsive
                    fixedHeader
                    highlightOnHover
                    customStyles={{
                        rows: {
                            style: {
                                minHeight: '40px',
                            },
                        },
                        headCells: {
                            style: {
                                fontWeight: 'bold',
                                backgroundColor: '#f9fafb',
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}
