import React, { useEffect, useState } from "react";
import { ViewMissPunchoutRequest } from "../../../Apis/apiHandlers";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewMissPunchoutRequestPage() {
  const { requestId } = useParams();
  const [requestData, setRequestData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissPunchData = async () => {
      try {
        const response = await ViewMissPunchoutRequest(requestId); 
        console.log("API Response:", response);
        const data = response.data?.data || response.data;
        setRequestData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    if (requestId) {
      fetchMissPunchData();
    }
  }, [requestId]);

  if (loading) return <div>Loading...</div>;

  if (!requestData) return <div>No data found.</div>;

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2>Miss Punch-Out Request Details</h2>
      <pre>{JSON.stringify(requestData, null, 2)}</pre>
      <p><strong>User ID:</strong> {requestData.userId}</p>
      <p><strong>Date:</strong> {requestData.date}</p>
      <p><strong>Punch Out Time:</strong> {requestData.punchOut}</p>
      <p><strong>Reason:</strong> {requestData.reason}</p>
      <p><strong>Status:</strong> {requestData.status}</p>
    </div>
  );
}
