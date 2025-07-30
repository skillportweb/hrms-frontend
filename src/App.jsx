import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Layout from "./Pages/Layout";
import Dashboard from "./Components/MainComponents/Dashboard";
import Employees from "./Components/MainComponents/Employees";
import Attendance from "./Components/MainComponents/Attendance";
import Leaves from "./Components/MainComponents/Leaves";
import Payroll from "./Components/MainComponents/Payroll";
import Departments from "./Components/MainComponents/Departments";
import Recruitment from "./Components/MainComponents/Recruitment";
import Performance from "./Components/MainComponents/Performance";
import Settings from "./Components/MainComponents/Settings";
import Login from "./Components/MainComponents/Login";
import SignUp from "./Components/MainComponents/SignUp";
import UserProfile from "./Components/MainComponents/UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./Components/MainComponents/NotFound";
import UserAccount from "./Components/User/UserAccount";
import UserLeaves from "./Components/User/UserLeaves";
import SingleLeaveDetails from "./Components/User/SingleLeaveDetails";
import MyAttendance from "./Components/User/MyAttendance";
import AttendanceMonthlyTable from "./Components/Admin/AttendanceManagement/AttendanceMonthlyTable";


function App() {
  const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/leaves" element={<Leaves />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/userprofile" element={<UserProfile />} />
            {/* User routes */}
            <Route path="/my-account" element={<UserAccount />} />
            <Route path="/my-leaves" element={<UserLeaves />} />
             <Route path="/single-leave-details/:id" element={<SingleLeaveDetails />} />
              <Route path="/my-attendance" element={<MyAttendance/>} />
              <Route path="/attendance-monthly-table/:userId" element={<AttendanceMonthlyTable/>} />

          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
