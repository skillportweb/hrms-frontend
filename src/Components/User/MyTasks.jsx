import React, { useState } from "react";
import {
    FaTrashAlt,
    FaTasks,
    FaRegSmile,
    FaClipboardList,
    FaHourglassHalf,
} from "react-icons/fa";

export default function MyTasks() {
    const [newTask, setNewTask] = useState("");
    const [tasks, setTasks] = useState([
        { id: 1, text: "Complete quarterly report", completed: false },
        { id: 2, text: "Team meeting preparation", completed: true },
        { id: 3, text: "Review project proposals", completed: false },
        { id: 4, text: "Update documentation", completed: true },
        { id: 5, text: "Client feedback review", completed: false },
    ]);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([
                ...tasks,
                {
                    id: Date.now(),
                    text: newTask,
                    completed: false,
                },
            ]);
            setNewTask("");
        }
    };

    const toggleTask = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const pendingTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);

    return (
        <div className="min-h-screen">
            <div className=" mx-auto">
                {/* Header */}
                <div className="text-center mb-5">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-2 flex justify-center items-center gap-2">
                        <FaTasks className="text-[#2c3e50]" /> My Tasks
                    </h1>
                    <p className="text-gray-600">Keep track of your daily tasks</p>
                </div>
                <hr className="mb-5" />

                {/* Add New Task */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="What do you need to do?"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addTask()}
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#2c3e50] focus:border-[#2c3e50] outline-none"
                        />
                        <button
                            onClick={addTask}
                            className="px-6 py-3 sm:w-auto w-full bg-[#2c3e50] text-white rounded-lg hover:bg-[#1d262f] transition-colors font-medium"
                        >
                            Add Task
                        </button>
                    </div>
                </div>

                {/* Two Sections Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pending Tasks */}
                    <div className="bg-white rounded-lg shadow-sm border">
                        <div className="p-4 border-b border-gray-100 bg-red-50 
     rounded-tl-[10px] rounded-tr-[10px] rounded-br-[0px] rounded-bl-[0px]">

                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <FaHourglassHalf className="text-red-500" /> Pending Tasks
                                </h2>
                                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium">
                                    {pendingTasks.length}
                                </span>
                            </div>
                        </div>

                        <div className="p-2">
                            {pendingTasks.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <FaRegSmile className="text-4xl text-green-500 mx-auto mb-2" />
                                    <p>All tasks completed!</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {pendingTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg group"
                                        >
                                            {/* Checkbox */}
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => toggleTask(task.id)}
                                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />

                                            <span className="flex-1 text-gray-900">{task.text}</span>

                                            <button
                                                onClick={() => deleteTask(task.id)}
                                                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Completed Tasks */}
                    <div className="bg-white rounded-lg shadow-sm border">
                        <div className="p-4 border-b border-gray-100 bg-green-50  rounded-tl-[10px] rounded-tr-[10px] rounded-br-[0px] rounded-bl-[0px]">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <FaClipboardList className="text-green-600" /> Completed Tasks
                                </h2>
                                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-medium">
                                    {completedTasks.length}
                                </span>
                            </div>
                        </div>

                        <div className="p-2">
                            {completedTasks.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <FaClipboardList className="text-4xl text-gray-400 mx-auto mb-2" />
                                    <p>No completed tasks yet</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {completedTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg group"
                                        >
                                            {/* Checkbox */}
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => toggleTask(task.id)}
                                                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            />

                                            <span className="flex-1 text-gray-500 ">
                                                {task.text}
                                            </span>

                                            <button
                                                onClick={() => deleteTask(task.id)}
                                                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center space-x-4 bg-white rounded-lg px-6 py-3 shadow-sm border">
                        <div className="flex items-center space-x-2">
                            <FaHourglassHalf className="text-red-500" />
                            <span className="text-sm text-gray-600">
                                {pendingTasks.length} pending
                            </span>
                        </div>
                        <div className="w-px h-4 bg-gray-200"></div>
                        <div className="flex items-center space-x-2">
                            <FaClipboardList className="text-green-600" />
                            <span className="text-sm text-gray-600">
                                {completedTasks.length} completed
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
