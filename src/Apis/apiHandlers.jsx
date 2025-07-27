import { Endpoints } from "./constant/apiEndPoints";
import { api } from "./api";


export const Register = async (payload) => {
  return await api.post(Endpoints.Register, payload);
};

export const UserLogin = async (payload) => {
  return await api.post(Endpoints.Login, payload);
};

export const Profile = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User is not authenticated');

  const response = await api.get(Endpoints.Profile, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(" Full API response:", response);
  // Return only the user object
  return response.user; 
};

export const UserLogout = async (payload) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.post(Endpoints.Logout, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetAllUsers = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.get(Endpoints.GetAllUsers, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// leave
export const SendYearlyLeave = async (userId, data) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.post(`${Endpoints.SendYearlyLeaves}/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetPendingLeaveRequests = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.get(Endpoints.GetPendingLeaveRequests, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetApprovedAndRejectedLeaverequests = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.get(Endpoints.GetApprovedAndRejectedLeaverequests, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetSingleLeaveRequest = async (leaveId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.get(`${Endpoints.GetsingleLeaveRequest}/${leaveId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const ChangeLeaveStatus = async (leaveId, status) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.put(
    `${Endpoints.ChangeLeaveStatus}/${leaveId}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const GetUserLeaveBalance = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.get(`${Endpoints.GetUserLeaveBalance}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const UpdateUserStatus = async (userId, status) => {
  console.log('UpdateUserStatus called with:', { userId, status });
  
  if (!userId) {
    throw new Error("User ID is required");
  }

  if (!status) {
    throw new Error("Status is required");
  }

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User is not authenticated");
  }

  // Map frontend status to backend expected values
  const statusMapping = {
    'Approved': 'approved',     
    'Blocked': 'blocked',      
    'Unblocked': 'unblocked'    
  };

  const backendStatus = statusMapping[status] || status;
  console.log('Sending to backend:', { userId, status: backendStatus });

  try {
    const response = await api.put(
      `${Endpoints.UpdateUserStatus}/${userId}`, 
      {
        status: backendStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Full API Error:', error);
    console.error('Error Response:', error.response?.data);
    console.error('Error Status:', error.response?.status);
    console.error('Error Headers:', error.response?.headers);
    
    throw new Error(error.response?.data?.message || 'Failed to update user status');
  }
};

export const ApplyUserLeave = async (userId, leaveData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.post(`${Endpoints.ApplyUserLeave}/${userId}`, leaveData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetApplyUserLeaves = async (userId) => {
  const token = localStorage.getItem("token");

  console.log("API Call - User ID:", userId); 

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.get(`${Endpoints.GetApplyUserLeaves}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetSingleApplyLeaveDetails = async (leaveId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.get(`${Endpoints.SingleApplyLeaveDetails}/${leaveId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// attendance

export const AddUserAttendance = async (payload) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.post(Endpoints.AddUserAttendance, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const PunchOutAttendance = async (payload) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.post(Endpoints.AttendancePunchout, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const GetAttendance = async (userId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.get(`${Endpoints.GetAttendance}/${userId}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



