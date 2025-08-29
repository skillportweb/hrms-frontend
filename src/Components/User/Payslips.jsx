import React, { useState } from 'react';
import { FaDownload, FaSearch, FaFilter, FaCalendarAlt, FaDollarSign, FaFileAlt, FaEye } from 'react-icons/fa';

export default function Payslips() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('2024');

    // Sample payslip data
    const payslips = [
        {
            id: 1,
            month: 'December 2024',
            grossSalary: 5500,
            netSalary: 4400,
            status: 'Paid',
            date: '2024-12-31'
        },
        {
            id: 2,
            month: 'November 2024',
            grossSalary: 5500,
            netSalary: 4400,
            status: 'Paid',
            date: '2024-11-30'
        },
        {
            id: 3,
            month: 'October 2024',
            grossSalary: 5500,
            netSalary: 4400,
            status: 'Paid',
            date: '2024-10-31'
        },
        {
            id: 4,
            month: 'September 2024',
            grossSalary: 5500,
            netSalary: 4400,
            status: 'Paid',
            date: '2024-09-30'
        }
    ];

    const filteredPayslips = payslips.filter(payslip =>
        payslip.month.toLowerCase().includes(searchTerm.toLowerCase()) &&
        payslip.date.includes(selectedYear)
    );

    return (
        <div className="min-h-screen from-slate-50 to-slate-100">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-5">
                    <h1 className="text-[22px] font-semibold text-gray-800  mb-2">Payslips</h1>
                    <p className="text-slate-600">View and download your salary statements</p>
                </div>
                <hr className="mb-5" />

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Total Payslips</p>
                                <p className="text-2xl font-semibold text-slate-800">{payslips.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <FaFileAlt className="w-6 h-6 text-[#2c3e50]" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Last Net Salary</p>
                                <p className="text-2xl font-semibold text-slate-800">${payslips[0]?.netSalary.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <FaDollarSign className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Total Earnings</p>
                                <p className="text-2xl font-semibold text-slate-800">${(payslips.reduce((sum, p) => sum + p.netSalary, 0)).toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <FaCalendarAlt className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <FaSearch className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search payslips..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div className="relative">
                            <FaFilter className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="pl-10 pr-8 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                            >
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Payslips List */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-200">
                        <h2 className="text-xl font-semibold text-slate-800"></h2>
                    </div>


                    <div className="divide-y divide-slate-200">
                        {filteredPayslips.map((payslip) => (
                            <div
                                key={payslip.id}
                                className="p-6 hover:bg-slate-50 transition-colors"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                                    {/* Left section: Icon + Month */}
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <FaFileAlt className="w-6 h-6 text-[#2c3e50]" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-800">{payslip.month}</h3>
                                            <p className="text-slate-500 text-sm">
                                                Pay Date: {new Date(payslip.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right section: Salary details + Actions */}

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 w-full lg:w-auto">
                                        <div className="flex-1 min-w-[180px] text-left sm:text-right">
                                            <p className="text-sm text-slate-500">Gross Salary</p>
                                            <p className="font-semibold text-slate-800">
                                                ${payslip.grossSalary.toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="flex-1 min-w-[180px] text-left sm:text-right">
                                            <p className="text-sm text-slate-500">Net Salary</p>
                                            <p className="font-semibold text-green-600">
                                                ${payslip.netSalary.toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="flex-1 min-w-[150px] text-left sm:text-right">
                                            <span
                                                className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-medium ${payslip.status === "Paid"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                    }`}
                                            >
                                                {payslip.status}
                                            </span>
                                        </div>

                                        <div className="flex space-x-3 justify-start sm:justify-end min-w-[120px]">
                                            <button className="p-2 text-slate-500 hover:text-green-600 hover:bg-blue-50 rounded-lg transition-all">
                                                <FaEye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                                                <FaDownload className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>



                    {filteredPayslips.length === 0 && (
                        <div className="p-12 text-center">
                            <FaFileAlt className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-500">No payslips found matching your criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
