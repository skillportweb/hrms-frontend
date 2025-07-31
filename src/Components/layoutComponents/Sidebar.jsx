import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar({ closeSidebar }) {
  const navigate = useNavigate();
  const role = parseInt(localStorage.getItem('role'), 10);

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };



  const commonLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
  ];

  const adminLinks = [
    { to: '/employees', label: 'Employees', icon: 'fas fa-users' },
    { to: '/attendance', label: 'Attendance', icon: 'fas fa-calendar-check' },
    { to: '/leaves', label: 'Leaves', icon: 'fas fa-plane-departure' },
      { to: '/holidays', label: 'Holidays', icon: 'fas fa-umbrella-beach' },
    { to: '/payroll', label: 'Payroll', icon: 'fas fa-money-check-alt' },
    { to: '/departments', label: 'Departments', icon: 'fas fa-building' },
    { to: '/recruitment', label: 'Recruitment', icon: 'fas fa-user-plus' },
    // { to: '/performance', label: 'Performance', icon: 'fas fa-chart-line' },
    { to: '/settings', label: 'Settings', icon: 'fas fa-cogs' },
  ];


  const userLinks = [
    { to: '/my-leaves', label: 'My Leaves', icon: 'fas fa-plane-departure' },
    { to: 'my-attendance', label: 'My Attendance', icon: 'fas fa-calendar-check' },
    { to: '/my-account', label: 'Account', icon: 'fas fa-user' },
    { to: '#', label: 'My Payslips', icon: 'fas fa-file-invoice-dollar' },
    { to: '#', label: 'My Tasks', icon: 'fas fa-tasks' },
    { to: '#', label: 'Announcements', icon: 'fas fa-bullhorn' },
    { to: '#', label: 'Support', icon: 'fas fa-headset' },
    { to: '#', label: 'Settings', icon: 'fas fa-cogs' },

  ];


  const linksToRender = [
    ...commonLinks,
    ...(role === 1 ? adminLinks : userLinks),
  ];

  return (
    <nav
      className="sticky md:static top-0 z-[1000] h-screen bg-[#2c3e50] text-white p-[25px] overflow-y-auto transition-all duration-300 ease-in-out"
      id="sidebar"
      role="navigation"
      aria-label="Main Sidebar Navigation"
    >
      <div className="flex justify-between items-center mb-6 pl-2">
        <Link to="/dashboard" className="text-2xl font-bold text-white" id="sidebarLogo">
          HRMS
        </Link>
        <button
          onClick={closeSidebar}
          className="text-white hover:text-red-400 text-xl block lg:hidden"
          aria-label="Close Sidebar"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>

      <div className="flex flex-col space-y-2" role="list" aria-labelledby="sidebarLogo">
        {linksToRender.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            onClick={handleLinkClick}
            className="flex items-center gap-2 text-white hover:bg-[#34495e] rounded px-2 py-3 transition-all duration-200"
          >
            <i className={item.icon} aria-hidden="true"></i> {item.label}
          </Link>
        ))}

        <button

          className="flex items-center gap-2 text-red-400 hover:text-red-600 hover:bg-[#34495e] rounded px-3 py-2 transition-all duration-200"
        >
          <i className="fas fa-sign-out-alt" aria-hidden="true"></i> Logout
        </button>
      </div>
    </nav>
  );
}
