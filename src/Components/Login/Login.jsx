import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Login({ saveUserData }) {
  const baseURL = "https://ecommerce.routemisr.com/";
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();


  async function handleLogin(values) {
    try {
      setIsLoading(true);

      const { data } = await axios.post(`${baseURL}api/v1/auth/signin`, values);

      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        saveUserData();
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9!@]{3,16}$/,
        "Password must start with uppercase..."
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });


  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="w-75 mx-auto py-5">
        <h3>Login Now :</h3>

        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form onSubmit={formik.handleSubmit}>
          {/* Email */}
          <div className="my-3">
            <label htmlFor="email">Email :</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control mt-2"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="alert alert-danger">{formik.errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div className="my-3">
            <label htmlFor="password">Password :</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control mt-2"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="alert alert-danger">{formik.errors.password}</div>
            )}
          </div>

          {/* Submit Button */}
          <div className="float-start">
            {isLoading ? (
              <button className="btn bg-info text-white" type="button">
                <i className="fas fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                className="btn bg-info text-white"
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
