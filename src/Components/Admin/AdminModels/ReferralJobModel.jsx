import React, { useEffect, useState } from "react";

export default function ReferralJobModel({ isOpen, onClose, jobId }) {
    const [yourEmail, setYourEmail] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("email");
        if (email) setYourEmail(email);
    }, []);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // yahan FormData bana ke API call kar sakte ho
        // const fd = new FormData(e.target);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">

                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Referral</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-black text-3xl"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>


                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4">

                    <div className="sm:col-span-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job ID</label>
                        <input
                            type="text"
                            value={jobId}
                            readOnly
                            className="w-full border rounded px-3 py-2 bg-gray-100"
                        />
                    </div>
                    <div className="sm:col-span-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                        <input
                            type="email"
                            name="yourEmail"
                            value={yourEmail}
                            onChange={(e) => setYourEmail(e.target.value)}
                            required
                            className="w-full border rounded px-3 py-2"
                            placeholder="you@company.com"
                        />
                    </div>


                    <div className="sm:col-span-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Name</label>
                        <input
                            type="text"
                            name="candidateName"
                            required
                            className="w-full border rounded px-3 py-2"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="sm:col-span-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Email</label>
                        <input
                            type="email"
                            name="candidateEmail"
                            required
                            className="w-full border rounded px-3 py-2"
                            placeholder="candidate@example.com"
                        />
                    </div>


                    <div className="sm:col-span-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Resume (PDF/DOC)</label>
                        <input
                            type="file"
                            name="resume"
                            accept=".pdf,.doc,.docx"
                            required
                            className="w-full border rounded px-3 "
                        />
                    </div>
                    <div className="sm:col-span-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn (optional)</label>
                        <input
                            type="url"
                            name="linkedin"
                            className="w-full border rounded px-3 py-2"
                            placeholder="https://linkedin.com/in/username"
                        />
                    </div>


                    <div className="sm:col-span-12">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes / Message</label>
                        <textarea
                            name="notes"
                            rows={2}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Write something about the referral…"
                        />
                    </div>


                    <div className="sm:col-span-12 flex justify-end gap-2 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-[#2c3e50] text-white rounded hover:bg-[#43596f]"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
