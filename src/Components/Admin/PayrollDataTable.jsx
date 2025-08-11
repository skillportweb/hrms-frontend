import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { GetAllUsers } from "../../Apis/apiHandlers";
import PromotionModel from "./AdminModels/PromotionModel";

export default function PayrollDataTable() {
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
        } else {
          extractedUsers = [];
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

  const handleView = (user) => {
    // You can replace this with your actual view logic
    alert(`Viewing details for ${user.firstname} ${user.lastname}`);
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
      selector: (row) => row.promoteDate ? new Date(row.promoteDate).toLocaleDateString() : "N/A",
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

          <button
            onClick={() => handleView(row)}
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
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "180px",
    },
  ];

  if (loading) return <div style={{ padding: 20 }}>Loading users...</div>;
  if (error)
    return (
      <div style={{ padding: 20, color: "red" }}>
        <h3>Error loading users:</h3>
        <p>{error}</p>
      </div>
    );
  if (!users.length)
    return (
      <div style={{ padding: 20 }}>
        <h3>No users found.</h3>
      </div>
    );

  return (
    <>
      <div>
        <DataTable
          columns={columns}
          data={users}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
          striped
        />
      </div>

      <PromotionModel isOpen={isModalOpen} onClose={closeModal} firstName={selectedUser?.firstname} />
    </>
  );
}
