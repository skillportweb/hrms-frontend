import React, { useState, useEffect } from "react";
import {
  FaTrashAlt,
  FaTasks,
  FaRegSmile,
  FaClipboardList,
  FaHourglassHalf,
} from "react-icons/fa";
import {
  AddTask,
  DeleteTask,
  TaskComplete,
  GetTasksPending,
  GetTaskComplete,
} from "../../Apis/apiHandlers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyTasks() {
  const [newTask, setNewTask] = useState("");
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  // Fetch tasks on mount
  useEffect(() => {
    if (!userId) {
      toast.error("User ID not found in localStorage");
      return;
    }
    fetchTasks();
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const [pendingRes, completedRes] = await Promise.all([
        GetTasksPending(userId),
        GetTaskComplete(userId),
      ]);

      setPendingTasks(pendingRes.data || []);
      setCompletedTasks(completedRes.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks.");
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      setLoading(true);

      const payload = {
        userId: parseInt(userId, 10),
        todo: newTask.trim(),
      };

      const response = await AddTask(payload);
      const savedTask = response.data?.data;

      setPendingTasks((prev) => [
        ...prev,
        {
          id: savedTask?.id || Date.now(),
          text: savedTask?.todo || newTask.trim(),
          completed: false,
        },
      ]);

      setNewTask("");
      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to add task.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (task) => {
    try {
      await TaskComplete(task.id);
      toast.success(
        task.completed ? "Task moved to pending!" : "Task marked completed!"
      );
      fetchTasks();
    } catch (error) {
      console.error("Error toggling task:", error);
      toast.error("Failed to update task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await DeleteTask(id);
      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
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
              disabled={loading}
              className={`px-6 py-3 sm:w-auto w-full rounded-lg transition-colors font-medium ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#2c3e50] text-white hover:bg-[#1d262f]"
              }`}
            >
              {loading ? "Adding..." : "Add Task"}
            </button>
          </div>
        </div>

        {/* Two Sections Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Tasks */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div
              className="p-4 border-b border-gray-100 bg-red-50 
                            rounded-tl-[10px] rounded-tr-[10px]"
            >
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
                        checked={false}
                        onChange={() => toggleTask(task)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />

                      <span className="flex-1 text-gray-900">
                        {task.todo || task.text}
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

          {/* Completed Tasks */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div
              className="p-4 border-b border-gray-100 bg-green-50  
                            rounded-tl-[10px] rounded-tr-[10px]"
            >
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
                        checked={true}
                        onChange={() => toggleTask({ ...task, completed: true })}
                        className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />

                      <span className="flex-1 text-gray-500">
                        {task.todo || task.text}
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
