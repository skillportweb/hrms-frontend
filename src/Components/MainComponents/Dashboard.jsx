import React from "react";
import WeeklyLeaveChart from "../Charts/Admin/WeeklyLeaveChart";
import LeavesCards from "../Admin/LeavesCards";
import MonthlyLeaveChart from "../Charts/Admin/MonthlyLeaveChart";
import AdminUserDatatable from "../Admin/AdminUserDatatable";
import AdminDashboardMain from "../Admin/AdminDashboardMain";
import UserDashboardMain from "../User/UserDashboardMain";
import UserHolidayChart from "../Charts/User/UserHolidayChart";

export default function Dashboard() {
  // Example: assuming you store the role as a number in localStorage like '1' or '0'
  const role = parseInt(localStorage.getItem("role"), 10); 

  console.log("Parsed role:", role); 
  return (
    <>
      {role === 1 ? (
        <div className="admin-main-dashboard">
          <AdminDashboardMain />
          <div>
            <LeavesCards />
          </div>
          <div className=" mt-5">
            <h1 className="pb-5 mt-3 pl-2 text-lg font-semibold">
              Leave Distribution
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className=" dark:bg-slate-700 bg-slate-50 p-8 rounded-lg shadow-md">
                <WeeklyLeaveChart />
              </div>
              <div className="bg-slate-50 text-gray-800 rounded-lg shadow  text-center ">
                <MonthlyLeaveChart />
              </div>
            </div>
          </div>
          <div>
            <AdminUserDatatable />
          </div>
        </div>
      ) : role === 0 ? (
        <div className="users-main-Dashboard">
          <UserDashboardMain />
          <div className="mt-8">
            <UserHolidayChart />
          </div>
        </div>
      ) : (
        <div className="text-center mt-10 text-red-600 font-bold">
          Invalid role. Please login again.
        </div>
      )}
    </>
  );
}
