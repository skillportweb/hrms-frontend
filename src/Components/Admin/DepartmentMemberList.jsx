import React, { useEffect, useState } from 'react';
import AddMemberModel from './AdminModels/AddMemberModel';

export default function DepartmentMemberList({ departmentId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Log departmentId when component mounts or changes
  useEffect(() => {
    console.log('Received departmentId in DepartmentMemberList:', departmentId);
  }, [departmentId]);

  return (
    <div className="">
      {/* Top bar */}
      <div className="flex gap-4 justify-end items-center mb-4">
      
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-4 bg-[#2c3e50] text-white px-4 py-2 rounded hover:bg-[#374554] transition"
        >
          Update Member
        </button>
      </div>

      {/* Modal */}
      <AddMemberModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        departmentId={departmentId} // pass departmentId to the modal as well
      />
    </div>
  );
}
