import React, { useState } from "react";
import AddNewEmployeeModel from "./AdminModels/AddNewEmployeeModel";
import MainDataActionTable from "./MainDataActionTable";

export default function EmployeesActionTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="container mx-auto px-3 py-3">
        <div className="flex justify-between items-center mb-4">
          
          <h1 className="text-lg font-semibold">Employee Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-white bg-[#2c3e50] px-4 py-2 rounded hover:bg-[#43596f] transition"
          >
            Add New Employee
          </button>
        </div>
        <hr className="mb-5"/>
        <MainDataActionTable/>
      </div>

      <AddNewEmployeeModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
