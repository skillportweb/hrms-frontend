import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { Link, useParams, useNavigate } from "react-router-dom";
import { GetJobDetails, UpdateJob } from "../../Apis/apiHandlers";
import { toast } from "react-toastify";

export default function UpdateJobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await GetJobDetails(id);
        const job = res.data;

        setInitialValues({
          jobTitle: job.jobTitle || "",
          jobId: job.jobId || "",
          city: job.city || "",
          state: job.state || "",
          country: job.country || "",
          workArrangement: job.workArrangement || "",
          areaOfWork: job.areaOfWork || "",
          employmentType: job.employmentType || "",
          positionType: job.positionType || "",
          travelRequired: job.travelRequired || "",
          shift: job.shift || "",
          preferredEducation: job.education || "",
          introduction: job.introduction || "",
          roleResponsibilities: job.responsibilities || "",
          requiredSkills: job.skills || "",
        });
      } catch (err) {
        console.error("Error loading job:", err);
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        responsibilities: values.roleResponsibilities,
        skills: values.requiredSkills,
      };

      // Remove the alias fields to avoid redundancy if needed
      delete payload.roleResponsibilities;
      delete payload.requiredSkills;

      await UpdateJob(id, payload);
      toast.success("Job updated successfully!");
      navigate("/recruitment");
    } catch (err) {
      console.error("Error updating job:", err);
      toast.error("Failed to update job.");
    }
  };

  if (!initialValues) {
    return <div className="p-4">Loading form...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-6">
        <Link to="/recruitment">Recruitment /</Link> Update Job
      </h2>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Text fields */}
            {[
              { name: "jobTitle", label: "Job Title" },
              { name: "jobId", label: "Job ID" },
              { name: "city", label: "City/Township/Village" },
              { name: "state", label: "State/Province" },
              { name: "country", label: "Country" },
              { name: "areaOfWork", label: "Area of Work" },
            ].map(({ name, label }) => (
              <div key={name}>
                <label className="block font-medium mb-1">{label}</label>
                <Field type="text" name={name} className="w-full border rounded px-3 py-2" />
              </div>
            ))}

            {/* Select fields */}
            {[
              {
                name: "workArrangement", label: "Work Arrangement", options: ["onsite", "remote", "hybrid"]
              },
              {
                name: "employmentType", label: "Employment Type", options: ["full-time", "part-time", "contract", "internship"]
              },
              {
                name: "positionType", label: "Position Type", options: ["mid-level", "senior-level", "internship"]
              },
              {
                name: "travelRequired", label: "Travel Required", options: ["none", "occasional", "frequent"]
              },
              {
                name: "shift", label: "Shift", options: ["day", "night", "rotational"]
              },
              {
                name: "preferredEducation", label: "Preferred Education", options: ["bachelors", "masters", "phd", "diploma"]
              },
            ].map(({ name, label, options }) => (
              <div key={name}>
                <label className="block font-medium mb-1">{label}</label>
                <Field as="select" name={name} className="w-full border rounded px-3 py-2">
                  <option value="">Select</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </option>
                  ))}
                </Field>
              </div>
            ))}

            {/* Textareas */}
            {[
              { name: "introduction", label: "Introduction", rows: 3 },
              { name: "roleResponsibilities", label: "Role and Responsibilities", rows: 4 },
              { name: "requiredSkills", label: "Required Technical Skills", rows: 3 },
            ].map(({ name, label, rows }) => (
              <div key={name} className="md:col-span-3">
                <label className="block font-medium mb-1">{label}</label>
                <Field as="textarea" name={name} className="w-full border rounded px-3 py-2" rows={rows} />
              </div>
            ))}

            <div className="md:col-span-3 flex justify-end">
              <button
                type="submit"
                className="bg-[#2c3e50] text-white px-6 py-2 rounded hover:bg-[#405a74]"
              >
                Update Job
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
