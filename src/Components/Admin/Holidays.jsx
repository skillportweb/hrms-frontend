import React, { useState, useEffect } from "react";
import AddHolidayModel from "./AdminModels/AddHolidayModel";
import { GetAllHoliday } from "../../Apis/apiHandlers"; 

export default function Holidays() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await GetAllHoliday();
        setHolidays(response.holidays || []);
        console.log("Fetched holidays:", response.holidays);
      } catch (error) {
        console.error("Failed to fetch holidays:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  const handleHolidayAdded = () => {
    const fetchHolidays = async () => {
      try {
        const response = await GetAllHoliday();
        setHolidays(response.holidays || []);
      } catch (error) {
        console.error("Failed to fetch holidays:", error);
      }
    };
    fetchHolidays();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 mt-4">
        <h1 className="text-lg font-semibold">Holidays</h1>
        <button
          className="text-white bg-[#2c3e50] px-4 py-1 rounded hover:bg-[#43596f] transition text-[15px]"
          onClick={() => setIsModalOpen(true)}
        >
          Add Holidays
        </button>
      </div>
      <hr />

      <AddHolidayModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddHoliday={handleHolidayAdded}
      />

      {loading ? (
        <p className="mt-4">Loading holidays...</p>
      ) : holidays.length === 0 ? (
        <p className="mt-4">No holidays found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {holidays.map((holiday, index) => {
            const bgColors = [
              "bg-green-100",
              "bg-yellow-100",
              "bg-pink-100",
              "bg-blue-100",
              "bg-purple-100",
              "bg-orange-100",
            ];
            const bgColor = bgColors[index % bgColors.length];

            return (
              <div
                key={holiday.id}
                className={`${bgColor} text-gray-800 border border-gray-300 rounded-lg p-4 shadow-sm`}
              >
                <h2 className="text-lg font-bold mb-1">{holiday.title}</h2>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  📅 {new Date(holiday.date).toDateString()}
                </p>
                <p className="text-sm text-gray-900">{holiday.message}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
