import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Register } from "../../../Apis/apiHandlers";
import { toast } from "react-toastify";

export default function AddNewEmployeeModel({ isOpen, onClose }) {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    designation: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    dob: Yup.string().required("Date of birth is required"),
    designation: Yup.string().required("Designation is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await Register(values);
      toast.success("Employee added successfully!");
      resetForm();
      onClose(); // close the modal
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Email already registered";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Add New Employee</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-3xl"
          >
            &times;
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <Field
                  name="firstname"
                  type="text"
                  placeholder="Enter first name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage name="firstname" component="div" className="text-sm text-red-600" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <Field
                  name="lastname"
                  type="text"
                  placeholder="Enter last name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage name="lastname" component="div" className="text-sm text-red-600" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage name="email" component="div" className="text-sm text-red-600" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Field
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage name="phone" component="div" className="text-sm text-red-600" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg"
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
                <ErrorMessage name="password" component="div" className="text-sm text-red-600" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date of Birth</label>
                <Field
                  name="dob"
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage name="dob" component="div" className="text-sm text-red-600" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Designation</label>
                <Field
                  name="designation"
                  type="text"
                  placeholder="Enter designation"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage name="designation" component="div" className="text-sm text-red-600" />
              </div>

              <div className="md:col-span-2 flex justify-end gap-2 border-t pt-4 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
