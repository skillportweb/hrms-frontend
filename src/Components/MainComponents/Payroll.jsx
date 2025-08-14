

import React, { useState } from 'react';
import PayrollDataTable from '../Admin/PayrollDataTable';

export default function Payroll() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="flex justify-between items-center mb-4 mt-4">
        <h1 className="text-lg font-semibold">Payroll</h1>

        <input
          type="text"
          placeholder="Search Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c3e50] transition text-[15px]"
        />
      </div>
      <hr />
      <div className='mt-4'>
        {/* Pass searchTerm as a prop */}
        <PayrollDataTable searchTerm={searchTerm} />
      </div>
    </>
  );
}
