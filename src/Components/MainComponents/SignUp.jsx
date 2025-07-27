import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Register } from '../../Apis/apiHandlers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        dob: '',
        designation: '',
    };

    const validationSchema = Yup.object({
        firstname: Yup.string().required('First name is required'),
        lastname: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits').required('Phone is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        dob: Yup.string().required('Date of birth is required'),
        designation: Yup.string().required('Designation is required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await Register(values);
            console.log('Registration successful:', response.data);

            toast.success('Registration successful!');
            resetForm();

            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message || 'Email already registered';
            toast.error(errorMessage);
            console.error('Registration failed:', errorMessage);
        }
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values }) => (
                        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <Field
                                    type="text"
                                    name="firstname"
                                    placeholder="Enter first name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c3e50]"
                                />
                                <ErrorMessage name="firstname" component="div" className="text-sm text-red-600" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <Field
                                    type="text"
                                    name="lastname"
                                    placeholder="Enter last name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c3e50]"
                                />
                                <ErrorMessage name="lastname" component="div" className="text-sm text-red-600" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c3e50]"
                                />
                                <ErrorMessage name="email" component="div" className="text-sm text-red-600" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <Field
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c3e50]"
                                />
                                <ErrorMessage name="phone" component="div" className="text-sm text-red-600" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <Field
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Enter password"
                                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c3e50]"
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                <Field
                                    type="date"
                                    name="dob"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c3e50]"
                                />
                                <ErrorMessage name="dob" component="div" className="text-sm text-red-600" />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                                <Field
                                    type="text"
                                    name="designation"
                                    placeholder="Enter designation"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c3e50]"
                                />
                                <ErrorMessage name="designation" component="div" className="text-sm text-red-600" />
                            </div>

                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    className="w-full bg-[#2c3e50] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#3a5269] transition"
                                >
                                    Sign Up
                                </button>
                                <p className="text-sm text-center mt-2">
                                    Already have an account?{' '}
                                    <Link to="/" className="text-green-600 font-medium hover:underline">
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
}
