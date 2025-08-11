import React, { useEffect, useState } from 'react';
import {
  FaUsers, FaMoneyCheckAlt, FaLaptopCode, FaChartLine, FaBullhorn,
  FaHeadset, FaFlask, FaCogs, FaGavel, FaShoppingCart, FaCheckCircle,
  FaBuilding, FaTruck, FaHandshake, FaWrench, FaBoxOpen, FaDraftingCompass,
  FaShieldAlt, FaChalkboardTeacher, FaQuestionCircle
} from 'react-icons/fa';
import { GetAllDepartments, UpdateDepartmentStatus } from '../../Apis/apiHandlers';
import { toast } from 'react-toastify';
import EditDepartmentsModel from './AdminModels/EditDepartmentsModel';
import { Link } from 'react-router-dom';

export default function DepartmentsCard() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [selectedDepartmentData, setSelectedDepartmentData] = useState(null);

  const openModal = (id) => {
    const dept = departments.find((d) => d.id === id);
    setSelectedDepartmentId(id);
    setSelectedDepartmentData(dept);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await GetAllDepartments();

      let departmentsData = [];
      if (Array.isArray(response?.data)) departmentsData = response.data;
      else if (Array.isArray(response)) departmentsData = response;
      else if (Array.isArray(response?.departments)) departmentsData = response.departments;
      else if (Array.isArray(response?.result)) departmentsData = response.result;
      else if (Array.isArray(response?.items)) departmentsData = response.items;

      setDepartments(departmentsData);
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error("Failed to fetch departments");
      setError("Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const iconMap = {
    hr: { icon: FaUsers, color: 'text-blue-400', bg: 'bg-blue-100' },
    finance: { icon: FaMoneyCheckAlt, color: 'text-green-400', bg: 'bg-green-100' },
    marketing: { icon: FaBullhorn, color: 'text-pink-400', bg: 'bg-pink-100' },
    sales: { icon: FaChartLine, color: 'text-yellow-400', bg: 'bg-yellow-100' },
    customer: { icon: FaHeadset, color: 'text-teal-400', bg: 'bg-teal-100' },
    research: { icon: FaFlask, color: 'text-purple-400', bg: 'bg-purple-100' },
    it: { icon: FaLaptopCode, color: 'text-indigo-400', bg: 'bg-indigo-100' },
    operations: { icon: FaCogs, color: 'text-gray-500', bg: 'bg-gray-100' },
    legal: { icon: FaGavel, color: 'text-red-400', bg: 'bg-red-100' },
    procurement: { icon: FaShoppingCart, color: 'text-orange-400', bg: 'bg-orange-100' },
    quality: { icon: FaCheckCircle, color: 'text-green-500', bg: 'bg-green-100' },
    admin: { icon: FaBuilding, color: 'text-blue-500', bg: 'bg-blue-100' },
    logistics: { icon: FaTruck, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    business: { icon: FaHandshake, color: 'text-rose-400', bg: 'bg-rose-100' },
    engineering: { icon: FaWrench, color: 'text-gray-400', bg: 'bg-gray-100' },
    product: { icon: FaBoxOpen, color: 'text-indigo-300', bg: 'bg-indigo-100' },
    design: { icon: FaDraftingCompass, color: 'text-pink-500', bg: 'bg-pink-100' },
    security: { icon: FaShieldAlt, color: 'text-red-500', bg: 'bg-red-100' },
    training: { icon: FaChalkboardTeacher, color: 'text-purple-500', bg: 'bg-purple-100' },
  };

  const getIconProps = (title = '') => {
    const lower = title.toLowerCase();
    for (const key in iconMap) {
      if (lower.includes(key)) return iconMap[key];
    }
    return { icon: FaQuestionCircle, color: 'text-gray-400', bg: 'bg-gray-100' };
  };

  const handleToggleStatus = async (deptId, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      const res = await UpdateDepartmentStatus(deptId, newStatus);
      toast.success(res?.data?.message || "Department status updated");
      await fetchDepartments();
    } catch (error) {
      console.error("UpdateDepartmentStatus error:", error);
      toast.error(error?.response?.data?.message || "Failed to update department status");
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-200 rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
              <div className="flex gap-4">
                <div className="h-8 bg-gray-300 rounded flex-1"></div>
                <div className="h-8 bg-gray-300 rounded flex-1"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.length > 0 ? (
          departments.map(dept => {
            const title = dept.title || dept.name || 'Unknown';
            const description = dept.description || 'No Description';
            const head = dept.headName || 'No Head Assigned';
            const { icon: Icon, color, bg } = getIconProps(title);

            return (
              <div
                key={dept.id}
                className={`relative ${bg} rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 overflow-hidden`}
              >
                <div className={`absolute top-3 left-3 text-6xl opacity-20 ${color}`}>
                  <Icon />
                </div>

                <div className="absolute top-3 right-3 z-10">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dept.status === 1}
                      onChange={() => handleToggleStatus(dept.id, dept.status)}
                      className="sr-only"
                    />
                    <div className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${dept.status === 1 ? 'bg-green-500' : 'bg-red-500'}`}>
                      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${dept.status === 1 ? 'translate-x-5' : ''}`} />
                    </div>
                  </label>
                </div>

                <div className="relative z-10 mt-2">
                  <h3 className="text-xl font-bold mb-1">{title}</h3>
                  <p className="text-gray-600 mb-2">{description}</p>
                  <p className="text-sm text-gray-700 mb-4 font-medium">
                    Head: <span className="font-semibold">{head}</span>
                  </p>

                  <div className="flex justify-between items-center gap-4 mt-4">
                    <Link
                      to={`department-details/${dept.id}`}
                      className="bg-white w-full text-center block text-gray-800 font-medium py-1.5 px-4 rounded hover:bg-gray-200 transition"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => {
                        console.log("Clicked ID:", dept.id);
                        openModal(dept.id);
                      }}
                      className="bg-white w-full text-gray-800 font-medium py-1.5 px-4 rounded hover:bg-gray-200 transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">No departments to show.</p>
            <p className="text-gray-400 text-sm mt-2">Check console for API response details</p>
          </div>
        )}
      </div>
      <EditDepartmentsModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        departmentId={selectedDepartmentId}
        departmentData={selectedDepartmentData}
      />
    </div>
  );
}
