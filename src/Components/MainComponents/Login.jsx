import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError, logout } from "../../Redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isTokenExpired } from "../../utils/authUtils";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const loadingToastId = useRef(null);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      if (isTokenExpired(token)) {
        toast.error("Session expired. Please login again.");
        dispatch(logout());
        navigate("/");
      } else {
        navigate("/dashboard");
      }
    }
  }, [token, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      loadingToastId.current = toast.loading("Logging in...", {
        position: "top-right",
      });

      const res = await dispatch(loginUser(values)).unwrap();

      if (res.user?.role !== undefined) {
        localStorage.setItem("role", res.user.role);
      }
      if (res.user?.id) {
        localStorage.setItem("userId", res.user.id);
      }
      if (res.user?.firstname) {
        localStorage.setItem("firstname", res.user.firstname);
      }

      toast.dismiss(loadingToastId.current);
      loadingToastId.current = null;

      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Login failed:", err);
      if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current);
        loadingToastId.current = null;
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c3e50]"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c3e50]"
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={loading || isSubmitting}
                className={`w-full py-2 px-4 mt-4 font-semibold rounded-lg transition ${
                  loading || isSubmitting
                    ? "bg-gray-400 cursor-not-allowed text-gray-600"
                    : "bg-[#2c3e50] text-white hover:bg-[#3a5269]"
                }`}
              >
                {loading || isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className="text-sm text-center">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-green-600 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
