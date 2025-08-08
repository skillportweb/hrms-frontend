import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getUsersByDepartmentId } from './../../Apis/apiHandlers';
import { Link } from "react-router-dom";

export default function DepartmentMembersDataTable({ departmentId }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);

  useEffect(() => {
    console.log("Received departmentId +++++++++:", departmentId);

    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await getUsersByDepartmentId(departmentId);
        console.log("API Response:", response);

        const data = response.data; // or response.data.data based on your API
        setMembers(data);
        setFilteredMembers(data);
      } catch (error) {
        console.error("Error fetching department members:", error);
      } finally {
        setLoading(false);
      }
    };

    if (departmentId) {
      fetchMembers();
    }
  }, [departmentId]);

  useEffect(() => {
    const filtered = members.filter(member =>
      `${member.firstname} ${member.lastname} ${member.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(filtered);
  }, [searchTerm, members]);

  const columns = [
    { name: "First Name", selector: row => row.firstname, sortable: true },
    { name: "Last Name", selector: row => row.lastname, sortable: true },
    { name: "Email", selector: row => row.email, sortable: true },
    { name: "Phone", selector: row => row.phone },
    { name: "DOB", selector: row => row.dob },
    { name: "Designation", selector: row => row.designation },
  ];

  return (
    <div className="mt-4">
      <div className="mb-5 mt-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-lg font-semibold text-center md:text-left">
          <Link to="/departments">Department Members</Link> / Department Details
        </h1>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search members..."
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-[300px] focus:outline-none focus:ring-2 focus:ring-[#2c3e50]"
        />
      </div>


      <DataTable
        columns={columns}
        data={filteredMembers}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
}
