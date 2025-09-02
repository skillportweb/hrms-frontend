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

  return await api.get(`${Endpoints.GetAttendance}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const RequestMissPunchout = async (userId, payload) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.post(`${Endpoints.RequestMissPunchout}/${userId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const ApproveMissPunchout = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.post(`${Endpoints.ApproveMissPunchout}/${requestId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const ViewMissPunchoutRequest = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.get(`${Endpoints.ViewMissPunchoutRequest}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const Addholidays = async (payload) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.post(Endpoints.Addholidays, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const GetAllHoliday = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.get(Endpoints.GetAllHoliday, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Recruitment

export const Addjob = async (payload) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.post(Endpoints.Addjob, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetAlljobs = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.get(Endpoints.GetAlljobs, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const GetJobDetails = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.get(`${Endpoints.GetJobDetails}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const UpdateJob = async (id, data) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.put(`${Endpoints.UpdateJob}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetActivejobs = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.get(Endpoints.GetActivejobs, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const ActiveJob = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.patch(
    `${Endpoints.ActiveJob}/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const DeactivateJob = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.patch(
    `${Endpoints.DeactivateJob}/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Department

export const AddDepartment = async (payload) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.post(Endpoints.AddDepartment, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetAllDepartments = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.get(Endpoints.GetAllDepartments, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const UpdateDepartment = async (id, data) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.put(`${Endpoints.UpdateDepartment}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const GetDepartmentById = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const response = await api.get(`${Endpoints.GetDepartmentById}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data; 
};


export const GetAllDepartmentstitle = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.get(Endpoints.GetAllDepartmentstitle, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetAllUsernamesWithId = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.get(Endpoints.GetAllUsernamesWithId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetUsersByDepartmentId = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }
  console.log(token)
  return await api.get(`${Endpoints.GetUsersByDepartmentId}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const AddDepartmentMembers = async (payload) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.post(Endpoints.AddDepartmentMembers, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUsersByDepartmentId = async (departmentId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }
  console.log(token)
  return await api.get(`${Endpoints.getUsersByDepartmentId}/${departmentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const UpdateDepartmentStatus = async (id, status) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  console.log("Token being sent:", token);

  return await api.put(
    `${Endpoints.UpdateDepartmentStatus}/${id}`,
    { status }, // body
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const ChangeDepartment = async (userId, departmentId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const payload = {
    userId,
    departmentId,
  };

  return await api.put(Endpoints.ChangeDepartment, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// promotion




export const UserPromotion  = async (userId, payload) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.put(`${Endpoints.UserPromotion }/${userId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const GetAllPromotions= async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }
  console.log(token)
  return await api.get(`${Endpoints.GetAllPromotions}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// support

export const CreateSupportRequest = async (payload) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  return await api.post(Endpoints.CreateSupportRequest, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetSupportRequests= async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }
  console.log(token)
  return await api.get(Endpoints.GetSupportRequests, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetRequestDetails= async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }
  console.log(token)
  return await api.get(`${Endpoints.GetRequestDetails}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const SupportPendingRequest= async (userId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }
  console.log(token)
  return await api.get(`${Endpoints.SupportPendingRequest}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const SupportSolvedRequest= async (userId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }
  console.log(token)
  return await api.get(`${Endpoints.SupportSolvedRequest}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const SupportRequestSolve = async (id, payload) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not authenticated");

  return await api.put(`${Endpoints.SupportRequestSolve}/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

