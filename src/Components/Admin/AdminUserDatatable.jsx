import React, { useState, useEffect } from 'react';
import { GetAllUsers } from '../../Apis/apiHandlers';
import { toast } from 'react-toastify';

export default function AdminUserDatatable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await GetAllUsers();
            console.log("Response from API:", response);

            const userData = response?.users;
            if (!Array.isArray(userData)) {
                throw new Error("Invalid user data format");
            }

            setUsers(userData);
        } catch (error) {
            console.error("Error fetching users:", error);
            setError(error.message || "Failed to fetch users");
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    fetchUsers();
}, []);


    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    if (loading) {
        return (
            <div className="mt-5">
                <h1 className="pb-5 mt-3 pl-2 text-lg font-semibold"></h1>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    <span className="ml-3 text-gray-600">Loading users...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-5">
                <h1 className="pb-5 mt-3 pl-2 text-lg font-semibold">User Management</h1>
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">Error: {error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div className="mt-5">
                <h1 className="pb-5 mt-3 pl-2 text-lg font-semibold">User Management</h1>
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-600">No users found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-5">
            <h1 className="pb-5 mt-3 pl-2 text-lg font-semibold">User Management</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                        <tr>
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">First Name</th>
                            <th className="px-4 py-3">Last Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Phone</th>
                            <th className="px-4 py-3">DOB</th>
                            <th className="px-4 py-3">Designation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(user => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{user.id}</td>
                                <td className="px-4 py-2">{user.firstname}</td>
                                <td className="px-4 py-2">{user.lastname}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.phone}</td>
                                <td className="px-4 py-2">{user.dob}</td>
                                <td className="px-4 py-2">{user.designation}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-700">
                    Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, users.length)} of {users.length} entries
                </span>

                <nav>
                    <ul className="inline-flex items-center -space-x-px text-sm">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i}>
                                <button
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-2 leading-tight border border-gray-300 ${currentPage === i + 1
                                        ? 'bg-gray-700 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
