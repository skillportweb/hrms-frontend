import React, { useState } from 'react';
import DepartmentsCard from '../Admin/DepartmentsCard';
import AddDepartmentsModel from '../Admin/AdminModels/AddDepartmentsModel';

export default function Departments() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex justify-between items-center mb-4 mt-4">
        <h1 className="text-lg font-semibold">Departments</h1>
        <button
          onClick={openModal}
          className="text-white bg-[#2c3e50] px-6 py-2 rounded 
        hover:bg-[#43596f] transition text-[15px]"
        >
          Add Departments
        </button>
      </div>

      <hr />

      <div className="mt-5">
        <DepartmentsCard />
      </div>

      <AddDepartmentsModel isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
