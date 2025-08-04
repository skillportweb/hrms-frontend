


import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Addjob } from "../../Apis/apiHandlers"; 
import { useNavigate } from "react-router-dom";

const jobSchema = Yup.object().shape({
  jobTitle: Yup.string().required("Job title is required"),
  jobId: Yup.string().required("Job ID is required"),
  city: Yup.string().required("City/Township/Village is required"),
  state: Yup.string().required("State/Province is required"),
  country: Yup.string().required("Country is required"),
  workArrangement: Yup.string().required("Work arrangement is required"),
  areaOfWork: Yup.string().required("Area of work is required"),
  employmentType: Yup.string().required("Employment type is required"),
  positionType: Yup.string().required("Position type is required"),
  travelRequired: Yup.string().required("Travel requirement is required"),
  shift: Yup.string().required("Shift is required"),
  preferredEducation: Yup.string().required("Preferred education is required"),
  introduction: Yup.string().required("Introduction is required"),
  roleResponsibilities: Yup.string().required("Role and responsibilities are required"),
  requiredSkills: Yup.string().required("Required technical skills are required"),
});

export default function AddJobsForm() {
  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      jobTitle: values.jobTitle,
      jobId: values.jobId,
      city: values.city,
      state: values.state,
      country: values.country,
      workArrangement: values.workArrangement,
      areaOfWork: values.areaOfWork,
      employmentType: values.employmentType,
      positionType: values.positionType,
      travelRequired: values.travelRequired,
      shift: values.shift,
      education: values.preferredEducation,
      introduction: values.introduction,
      responsibilities: values.roleResponsibilities,
      skills: values.requiredSkills,
    };

    try {
      const res = await Addjob(payload);
      toast.success("Job successfully added!");
      console.log("API response:", res.data);
      resetForm();
    } catch (error) {
      console.error("Add Job Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-6">
        <Link to="/recruitment">Recruitment /</Link> Add New Job
      </h2>

      <Formik
        initialValues={{
          jobTitle: "",
          jobId: "",
          city: "",
          state: "",
          country: "",
          workArrangement: "",
          areaOfWork: "",
          employmentType: "",
          positionType: "",
          travelRequired: "",
          shift: "",
          preferredEducation: "",
          introduction: "",
          roleResponsibilities: "",
          requiredSkills: "",
        }}
        validationSchema={jobSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <ErrorMessage name={name} component="div" className="text-red-500 text-xs" />
              </div>
            ))}

            <div>
              <label className="block font-medium mb-1">Work Arrangement</label>
              <Field as="select" name="workArrangement" className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                <option value="onsite">Onsite</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </Field>
              <ErrorMessage name="workArrangement" component="div" className="text-red-500 text-xs" />
            </div>

            <div>
              <label className="block font-medium mb-1">Employment Type</label>
              <Field as="select" name="employmentType" className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </Field>
              <ErrorMessage name="employmentType" component="div" className="text-red-500 text-xs" />
            </div>

            <div>
              <label className="block font-medium mb-1">Position Type</label>
              <Field as="select" name="positionType" className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                <option value="mid-level">Mid Level</option>
                <option value="senior-level">Senior Level</option>
                <option value="internship">Internship</option>
              </Field>
              <ErrorMessage name="positionType" component="div" className="text-red-500 text-xs" />
            </div>

            <div>
              <label className="block font-medium mb-1">Travel Required</label>
              <Field as="select" name="travelRequired" className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                <option value="none">None</option>
                <option value="occasional">Occasional</option>
                <option value="frequent">Frequent</option>
              </Field>
              <ErrorMessage name="travelRequired" component="div" className="text-red-500 text-xs" />
            </div>

            <div>
              <label className="block font-medium mb-1">Shift</label>
              <Field as="select" name="shift" className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                <option value="day">Day</option>
                <option value="night">Night</option>
                <option value="rotational">Rotational</option>
              </Field>
              <ErrorMessage name="shift" component="div" className="text-red-500 text-xs" />
            </div>

            <div>
              <label className="block font-medium mb-1">Preferred Education</label>
              <Field as="select" name="preferredEducation" className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">PhD</option>
                <option value="diploma">Diploma</option>
              </Field>
              <ErrorMessage name="preferredEducation" component="div" className="text-red-500 text-xs" />
            </div>

            {[
              { name: "introduction", label: "Introduction", rows: 3 },
              { name: "roleResponsibilities", label: "Role and Responsibilities", rows: 4 },
              { name: "requiredSkills", label: "Required Technical Skills", rows: 3 },
            ].map(({ name, label, rows }) => (
              <div key={name} className="md:col-span-3">
                <label className="block font-medium mb-1">{label}</label>
                <Field as="textarea" name={name} className="w-full border rounded px-3 py-2" rows={rows} />
                <ErrorMessage name={name} component="div" className="text-red-500 text-xs" />
              </div>
            ))}

            <div className="md:col-span-3 flex justify-end">
              <button
                type="submit"
                className="bg-[#2c3e50] text-white px-6 py-2 rounded hover:bg-[#405a74]"
              >
                Submit Job
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
