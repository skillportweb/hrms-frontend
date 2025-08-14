import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { GetAllUsers } from "../../Apis/apiHandlers";
import PromotionModel from "./AdminModels/PromotionModel";
import { Link } from "react-router-dom";


export default function PayrollDataTable({ searchTerm }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await GetAllUsers();

                let extractedUsers = [];

                if (response?.data?.users && Array.isArray(response.data.users)) {
                    extractedUsers = response.data.users;
                } else if (response?.users && Array.isArray(response.users)) {
                    extractedUsers = response.users;
                } else if (Array.isArray(response?.data)) {
                    extractedUsers = response.data;
                } else if (Array.isArray(response)) {
                    extractedUsers = response;
                }

                setUsers(extractedUsers);
            } catch (error) {
                setError(error.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    const columns = [
        { name: "Id", selector: (row) => row.id, sortable: true, width: "60px" },
        { name: "First Name", selector: (row) => row.firstname || "N/A", sortable: true },
        { name: "Last Name", selector: (row) => row.lastname || "N/A", sortable: true },
        { name: "Email", selector: (row) => row.email || "N/A" },
        { name: "Phone", selector: (row) => row.phone || "N/A" },
        { name: "Designation", selector: (row) => row.designation || "N/A" },
        {
            name: "Department Name",
            selector: (row) => row.departmentName || row.department?.title || "N/A",
            sortable: true,
        },
        { name: "Current Payroll", selector: (row) => row.currentPayroll || "N/A" },
        {
            name: "Promote Date",
            selector: (row) => row.promotionDate ? new Date(row.promotionDate).toLocaleDateString() : "N/A",
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <button
                        onClick={() => openModal(row)}
                        style={{
                            padding: "6px 12px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Promote
                    </button>

                    <Link
                        to={`/view-payroll/${row.id}`}
                        style={{
                            padding: "6px 12px",
                            backgroundColor: "#2196F3",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        View
                    </Link>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "180px",
        },
    ];

    //  Filter users based on searchTerm
    const filteredUsers = users.filter((u) => {
        const fullName = `${u.firstname || ""} ${u.lastname || ""}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    if (loading) return <div style={{ padding: 20 }}>Loading users...</div>;
    if (error)
        return (
            <div style={{ padding: 20, color: "red" }}>
                <h3>Error loading users:</h3>
                <p>{error}</p>
            </div>
        );

    return (
        <>
            <DataTable
                columns={columns}
                data={filteredUsers}
                pagination
                highlightOnHover
                pointerOnHover
                responsive
                striped
                noDataComponent="No matching users found."
            />

            <PromotionModel 
                isOpen={isModalOpen} 
                onClose={closeModal}
                firstName={selectedUser?.firstname}
                currentPayroll={selectedUser?.currentPayroll}
                userId={selectedUser?.id} 
            />
        </>
    );
}
