import { useState } from "react";
import Login_logo from "../assets/log_logo.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../lib/axios.config";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoEye, IoEyeOff } from "react-icons/io5";

const zodLoginValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const [eye, seteye] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(zodLoginValidation) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", data);
      if (response?.success) {
        if (response.data.user.role == "admin") {
          localStorage.setItem("authToken", response?.data?.token);
          Swal.fire({
            title: response.message,
            icon: "success",
          });
          window.location.reload()
          navigate("/");
        } else {
          Swal.fire({
            title: "Unauthoraized",
            icon: "error",
          });
        }
      }
    } catch (err) {
      if (err) {
        Swal.fire({
          title: "Credentials are wrong!",
          text: "Please try again!",
          icon: "error",
        });
      }
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message
      );
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container w-full md:w-[486px] flex flex-col justify-center items-center mt-20">
      <img src={Login_logo} alt="Login_logo" className="" />
      <h3 className="font-semibold text-[20px] text-primaryColor pt-8 pb-8">
        Admin Panel
      </h3>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6">
          <label htmlFor="email">Your email address</label> <br />
          <input
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
            type="text"
            placeholder="account@email.com"
            className="font-normal text-[12px] text-[#1A1A1A] opacity-60 border border-[#A2A2A2] py-3 pl-3  w-full rounded-[8px] outline-none mt-2"
            disabled={loading}
          />{" "}
          {errors.email && <p role="alert">hooop</p>}
        </div>
        <div className="mt-6 relative">
          <label htmlFor="password">Your password</label> <br />
          <input
            {...register("password")}
            type={eye ? "text" : "password"}
            placeholder="*******"
            className="font-normal text-[12px] text-[#1A1A1A] opacity-60 border border-[#A2A2A2] py-3 pl-3  w-full rounded-[8px] outline-none mt-2"
            disabled={loading}
          />
          <IoEyeOff onClick={() => seteye(true)} className={`absolute top-[60%] left-[93%] cursor-pointer opacity-55 ${eye ? "hidden" : "block"}`} />
          <IoEye onClick={() => seteye(false)} className={`absolute top-[60%] left-[93%] cursor-pointer opacity-55 ${eye ? "block" : "hidden"}`} />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="!md:px-52 mt-6 bg-BtnColor font-bold text-base text-white py-3 w-full rounded-[8px]"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
