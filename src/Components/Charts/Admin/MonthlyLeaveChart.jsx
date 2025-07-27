import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MonthlyLeaveChart() {
const data = {
  labels: ["Sick Leave", "Casual Leave", "Earned Leave", "Unpaid Leave"],
  datasets: [
    {
      label: "Leave Types",
      data: [50, 10, 20, 20],
      backgroundColor: [
        "rgba(100, 181, 246, 0.6)", 
        "rgba(255, 138, 128, 0.6)", 
        "rgba(129, 199, 132, 0.6)", 
        "rgba(255, 213, 79, 0.6)",  
      ],
      borderColor: [
        "rgba(100, 181, 246, 1)",   
        "rgba(255, 138, 128, 1)",   
        "rgba(129, 199, 132, 1)",   
        "rgba(255, 213, 79, 1)",    
      ],
      borderWidth: 1,
    },
  ],
};


  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100 mt-4">
        Monthly Leave Distribution
      </h2>
      <div className="p-4">
        <Pie className="w-32 h-32 lg:h-36" data={data} />
      </div>
    </div>
  );
}
