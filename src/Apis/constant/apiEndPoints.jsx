export const Endpoints = {
Register: "/register",
Login: "/login",
Profile: "/profile",
Logout : "/logout",
GetAllUsers:"/all-users",

// Admin leaves

SendYearlyLeaves: "/admingivenleave",
GetPendingLeaveRequests:"/get-pending-leaverequests",
GetsingleLeaveRequest:"/get-single-leaverequest",
ChangeLeaveStatus:"/leave-status",
GetApprovedAndRejectedLeaverequests:"/get-approvedandrejected-leaverequests",
UpdateUserStatus : "/approve-user",

 // User Leave

GetUserLeaveBalance: "/leave-balance",
ApplyUserLeave: "/userleaveapply",
GetApplyUserLeaves:"/get-apply-leaves",
SingleApplyLeaveDetails: "/single-apply-leave-details",

AddUserAttendance : "/add-user-attendance",
AttendancePunchout : "/attendance-punchout",
GetAttendance : "/get-attendance",
RequestMissPunchout:"/request-miss-punchout"
}