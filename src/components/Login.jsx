import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Input, ErrorMessage } from "./index";
import { login as storeLogin } from "../features/authSlice";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        try {
          const currUser = await authService.getCurrentUser();
          if (currUser) dispatch(storeLogin({ userData: currUser }));
        } catch (error) {
          setError(error.message);
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className="flex min-h-[75vh] items-center justify-center px-4 py-10">
        {error && <ErrorMessage message={error} onClose={() => setError("")} />}

        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-950 p-8 shadow-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-orange-500">Inkly</h1>
            <p className="mt-2 text-sm text-gray-400">
              Welcome back. Login to continue writing.
            </p>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit(login)} className="space-y-5">
            <Input
              type="email"
              placeholder="Enter your email"
              label="Email"
              {...register("email", {
                required: "Email is required",
                validate: (value) =>
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                  "Please enter a valid email address",
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}

            <Input
              type="password"
              placeholder="Enter your password"
              label="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          {/* Signup */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account ? {"  "}
            <NavLink
              to="/signup"
              className="font-semibold text-orange-500 transition hover:text-orange-400"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
