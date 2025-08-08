import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetAllUsers, UpdateUserStatus } from '../../Apis/apiHandlers';

export default function MainDataActionTable() {
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setPending(true);
      setError(null);
      const response = await GetAllUsers();

      // console.log("--------------", response?.users)

      // response?.users?.forEach((user, index) => {
      //   console.log(`User ${index + 1} departmentId:`, user?.departmentId);
      // });


      const userData = response?.users;

      if (!Array.isArray(userData)) {
        throw new Error('Invalid user data format');
      }

      setUsers(userData);
    } catch (error) {
      setError(error.message || 'Failed to fetch users');
      toast.error('Failed to load users');
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (userId, firstname, currentApproved) => {
    const newStatus = currentApproved ? 'Pending' : 'Approved';

    try {
      await UpdateUserStatus(userId, newStatus);
      toast.success(`${firstname}'s status changed to ${newStatus}`);
      await fetchUsers();
    } catch (error) {
      toast.error(`Failed to update status: ${error.message}`);
    }
  };

  const handleBlockChange = async (userId, firstname, currentBlocked) => {
    const newBlockStatus = currentBlocked ? 'Unblocked' : 'Blocked';

    try {
      await UpdateUserStatus(userId, newBlockStatus);
      toast.success(`${firstname} is now ${newBlockStatus}`);
      await fetchUsers();
    } catch (error) {
      toast.error(`Failed to update block status: ${error.message}`);
    }
  };

  const columns = [
    { name: 'Id', selector: row => row.id, sortable: true, width: '60px' },
    { name: 'First Name', selector: row => row.firstname, sortable: true },
    { name: 'Last Name', selector: row => row.lastname, sortable: true },
    { name: 'Email', selector: row => row.email },
    { name: 'Phone', selector: row => row.phone },
    { name: 'DOB', selector: row => row.dob },
    { name: 'Designation', selector: row => row.designation },
    { name: 'Department', selector: row => row.departmentId?.name || 'N/A' },

    {
      name: 'Is Blocked',
      cell: row => (
        <button
          onClick={() => handleBlockChange(row.id, row.firstname, row.isBlocked)}
          className={`w-24 px-2 py-1 rounded text-white text-sm text-center ${row.isBlocked ? 'bg-red-500' : 'bg-green-500'
            }`}
        >
          {row.isBlocked ? 'Blocked' : 'Unblocked'}
        </button>

      ),
      sortable: true,
      width: '120px',
    },

    {
      name: 'Status',
      cell: row => {
        const isApproved = row.approved === true;
        return (
          <button
            onClick={() => {
              if (!isApproved) {
                handleStatusChange(row.id, row.firstname, row.approved);
              }
            }}
            disabled={isApproved}
            className={`px-2 py-1 rounded text-white text-sm 
              ${isApproved ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'}`}
          >
            {isApproved ? 'Approved' : 'Pending'}
          </button>
        );
      },
      sortable: true,
      width: '120px',
    },
  ];

  return (
    <div className="">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <DataTable
        title="User List"
        columns={columns}
        data={users}
        progressPending={pending}
        pagination
        responsive
        highlightOnHover
        striped
        noHeader
      />
    </div>
  );
}
