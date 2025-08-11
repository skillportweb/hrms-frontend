import React from 'react'
import PayrollDataTable from '../Admin/PayrollDataTable'

export default function Payroll() {
  return (
    <>
      <div className="flex justify-between items-center mb-4 mt-4">
        <h1 className="text-lg font-semibold">Payroll</h1>
        
        <input 
          type="text" 
          placeholder="Search Name..." 
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c3e50] transition text-[15px]"
        />
      </div>
      <hr />
      <div className='mt-4'>
        <PayrollDataTable/>
      </div>
    </>
  )
}
