import React from 'react';

export default function LeavesCards() {
    return (
        <div className=' mt-5'>
            <h1 className='pb-5 pl-2 text-lg font-semibold mt-4'>Monthly Leave Report</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">


                <div className="bg-purple-200 text-gray-800 rounded-xl shadow-[0_0_20px_0_rgba(0,0,0,0.10)]  border border-gray-400  p-2 flex items-center gap-4">
                    <div className="border w-12 h-12 flex items-center justify-center rounded-full text-xl text-purple-700 bg-white">
                        <i className="fas fa-plane-departure"></i>
                    </div>
                    <div>
                        <h3 className="text-[17px] font-semibold">New Requests</h3>
                        <p className="text-2xl mt-1 font-bold">5</p>
                    </div>
                </div>


                <div className="bg-green-200 text-gray-800 rounded-xl shadow-[0_0_20px_0_rgba(0,0,0,0.10)]  border border-gray-400  p-2 flex items-center gap-4">
                    <div className="border w-12 h-12 flex items-center justify-center rounded-full text-xl text-green-700 bg-white">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <div>
                        <h3 className="text-[17px] font-semibold">Approved Requests</h3>
                        <p className="text-2xl mt-1 font-bold">12</p>
                    </div>
                </div>

                <div className="bg-red-200 text-gray-800 rounded-xl shadow-[0_0_20px_0_rgba(0,0,0,0.10)]  border border-gray-400  p-2 flex items-center gap-4">
                    <div className="border w-12 h-12 flex items-center justify-center rounded-full text-xl text-red-700 bg-white">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <div>
                        <h3 className="text-[17px] font-semibold">Rejected Requests</h3>
                        <p className="text-2xl mt-1 font-bold">2</p>
                    </div>
                </div>


                <div className="bg-yellow-200 text-gray-800 rounded-xl shadow-[0_0_20px_0_rgba(0,0,0,0.10)]  border border-gray-400  p-2 flex items-center gap-4">
                    <div className="border w-12 h-12 flex items-center justify-center rounded-full text-xl text-yellow-700 bg-white">
                        <i className="fas fa-calendar-check"></i>
                    </div>
                    <div>
                        <h3 className="text-[17px] font-semibold">Total Requests</h3>
                        <p className="text-2xl mt-1 font-bold">19</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
