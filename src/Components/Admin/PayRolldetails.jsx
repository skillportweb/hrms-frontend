import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import "react-toastify/dist/ReactToastify.css";
import { GetAllPromotions } from "../../Apis/apiHandlers";

export default function PayRolldetails() {
    const { id } = useParams();
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { name: "New Designation", selector: row => row.newDesignation, sortable: true },
        { name: "Current Payroll", selector: row => row.currentPayroll, sortable: true },
        { name: "Promoted Payroll", selector: row => row.promotedPayroll, sortable: true },
        {
            name: "Promotion Date",
            selector: row => row.promotionDate
                ? new Date(row.promotionDate).toLocaleDateString()
                : "-",
            sortable: true
        },
        { name: "Notes", selector: row => row.notes }
    ];

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const res = await GetAllPromotions(id);

                const rawData = Array.isArray(res.data?.data)
                    ? res.data.data
                    : Array.isArray(res.data)
                        ? res.data
                        : res.data?.promotions || [];

                const mappedData = rawData.map((p) => ({
                    newDesignation: p.newDesignation || p.new_designation || p.designation || "-",
                    currentPayroll: p.currentPayroll || p.current_payroll || p.currentSalary || p.current_salary || "-",
                    promotedPayroll: p.promotedPayroll || p.promoted_payroll || p.newSalary || p.new_salary || "-",
                    promotionDate: p.promotionDate || p.promotion_date || p.date || null,
                    notes: p.notes || p.note || p.comments || "-"
                }));

                setPromotions(mappedData);
            } catch (error) {
                toast.error(error.response?.data?.error || "Failed to load promotions");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPromotions();
    }, [id]);

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4"><Link to="/payroll">Payroll</Link> / Promotion History</h2>
            <hr />

            <DataTable
                className="mt-4"
                columns={columns}
                data={promotions}
                progressPending={loading}
                pagination
                highlightOnHover
                striped
                noDataComponent="No promotions found for this user."
            />
        </div>
    );
}
