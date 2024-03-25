/* eslint-disable react/no-unescaped-entities */
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => console.log(values);

  return (
    <div className="login flex min-h-full flex-1 flex-col justify-center px-6 py-12 bg-cover  "
    >
      <div className="rounded-lg flex flex-col items-center gap-y-3 ">
        <span className="font-mono text-5xl sm:text-6xl">Login</span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-lg sm:w-full sm:max-w-xs "
        >
    
          <label htmlFor="email" className="font-semibold my-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pl-2 py-1.5 rounded-md  text-gray-900 placeholder:text-slate-600 placeholder:text-sm ring-1 ring-slate-400  focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            {...register("email", {
              required: "Email is required...",
            })}
          />
          {errors.email && (
            <p className=" text-red-500 text-md tracking-widest font-semibold">
              {errors.email.message}
            </p>
          )}

          <label htmlFor="password" className="font-semibold my-2">
            Password
          </label>

          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="pl-2 py-1.5 rounded-md  text-gray-900 placeholder:text-slate-600 placeholder:text-sm ring-1 ring-slate-400  focus:ring-2 focus:ring-indigo-600 focus:outline-none "
            {...register("password", {
              required: "password is required...",
              minLength: 6,
            })}
          />
          {errors.password && (
            <p className=" text-red-500 text-md tracking-widest font-semibold">
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="bg-indigo-800 text-white rounded-lg p-1.5 mt-6 hover:bg-indigo-600  "
          >
            Login
          </button>
        </form>
        <p className="text-cente text-slate-900 font-medium">
            Don't have account?{" "}
            <NavLink to={"/register"} className="text-indigo-800">
              Sign Up
            </NavLink>
          </p>
        <p className="text-cente text-slate-900 font-medium">
            Forgot your password?{" "}
            <NavLink to={"/forgot-password"} className="text-indigo-800">
              Reset password
            </NavLink>
          </p>
      </div>
    </div>
  );
}
