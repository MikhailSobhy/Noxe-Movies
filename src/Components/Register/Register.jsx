import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register({ saveUserData }) {
  const baseUrl = "https://ecommerce.routemisr.com/";
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleRegister(values) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const { data } = await axios.post(`${baseUrl}api/v1/auth/signup`, values);

      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        saveUserData();
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name minlength is 3")
      .max(20, "name maxlength is 20"),

    email: Yup.string().email("Invalid email address").required("Required"),

    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9!@]{3,16}$/,
        "password must start with uppercase..."
      ),

    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "password and rePassword does not match"),

    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "phone must be a valid Egyptian number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });


  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>

      <div className="w-75 mx-auto py-4">
        <h3>Registration Form :</h3>

        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          {/* name */}
          <div className="my-3">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control mt-2"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.name && formik.touched.name && (
              <div className="alert alert-danger">{formik.errors.name}</div>
            )}
          </div>

          {/* email */}
          <div className="my-3">
            <label htmlFor="email">Email :</label>

            <input
              type="email"
              id="email"
              name="email"
              className="form-control mt-2"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.email && formik.touched.email && (
              <div className="alert alert-danger">{formik.errors.email}</div>
            )}
          </div>

          {/* password */}
          <div className="my-3">
            <label htmlFor="password">Password :</label>

            <input
              type="password"
              id="password"
              name="password"
              className="form-control mt-2"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.password && formik.touched.password && (
              <div className="alert alert-danger">{formik.errors.password}</div>
            )}
          </div>

          {/* rePassword */}
          <div className="my-3">
            <label htmlFor="rePassword">Confirm Password :</label>

            <input
              type="password"
              id="rePassword"
              name="rePassword"
              className="form-control mt-2"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.rePassword && formik.touched.rePassword && (
              <div className="alert alert-danger">
                {formik.errors.rePassword}
              </div>
            )}
          </div>

          {/* phone */}
          <div className="my-3">
            <label htmlFor="phone">Phone :</label>

            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control mt-2"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.phone && formik.touched.phone && (
              <div className="alert alert-danger">{formik.errors.phone}</div>
            )}
          </div>

          {/* button */}
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
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
