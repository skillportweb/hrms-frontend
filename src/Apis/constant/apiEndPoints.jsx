export const Endpoints = {
    Register: "/register",
    Login: "/login",
    Profile: "/profile",
    Logout: "/logout",
    GetAllUsers: "/all-users",

    // Admin leaves

    SendYearlyLeaves: "/admingivenleave",
    GetPendingLeaveRequests: "/get-pending-leaverequests",
    GetsingleLeaveRequest: "/get-single-leaverequest",
    ChangeLeaveStatus: "/leave-status",
    GetApprovedAndRejectedLeaverequests: "/get-approvedandrejected-leaverequests",
    UpdateUserStatus: "/approve-user",

    // User Leave

    GetUserLeaveBalance: "/leave-balance",
    ApplyUserLeave: "/userleaveapply",
    GetApplyUserLeaves: "/get-apply-leaves",
    SingleApplyLeaveDetails: "/single-apply-leave-details",

    // Attendance
    AddUserAttendance: "/add-user-attendance",
    AttendancePunchout: "/attendance-punchout",
    GetAttendance: "/get-attendance",
    RequestMissPunchout: "/request-miss-punchout",
    ApproveMissPunchout: "/approve-miss-punchout",
    ViewMissPunchoutRequest: "view-miss-punchout-request",

    // holiday
    Addholidays: "/add-holidays",
    GetAllHoliday: "/get-all-holiday",

    // Recruitment

    Addjob: "/add-job",
    GetAlljobs: "/get-all-jobs",
    GetJobDetails: "/getjobdetails",
    UpdateJob: "/edit-jobs",
    GetActivejobs: "/get-active-jobs",
    ActiveJob: "/activejob",
    DeactivateJob: "/deactivatejob",

    // Department
    AddDepartment: "/add-department",
    GetAllDepartments: "/get-all-departments",
    UpdateDepartment: "/update-department",
    GetDepartmentById: "/get-department-by-id",
    GetAllDepartmentstitle: "/get-all-departments-title",
    GetAllUsernamesWithId: "/get-all-usernames-with-id",

    GetUsersByDepartmentId: "/get-users-dy-department-id",
    AddDepartmentMembers: "/add-department-members",
    getUsersByDepartmentId: "get-users-by-departmentid",
    UpdateDepartmentStatus: "update-department-status",
    ChangeDepartment: "/change-department",

    // Promotion
    UserPromotion: "/user-promotion",
    GetAllPromotions: "/get-all-promotions",



    // Support
    CreateSupportRequest: "/support-request",
    GetSupportRequests: "/get-support-requests",
    GetRequestDetails: "/get-request-details",
    SupportPendingRequest: "/support/pending",
    SupportSolvedRequest: "/support/solved",
    SupportRequestSolve: "/support/solve",

    // TaskTODO
    AddTask: "/add-task",
    DeleteTask: "/delete-task",
    TaskComplete: "/task/complete",
    GetTasksPending: "/tasks/pending",
    GetTaskComplete: "/tasks/completed",
    GetLeaveRequestSummary : "/get-leave-request-summary"

}


