import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="register flex min-h-full flex-1 flex-col justify-center  px-6 py-12 gap-5 items-center ">
      <span className="px-20 py-2 w-max bg-green-100  text-green-700 flex items-center justify-center font-semibold">Success! Please check your email to verify account</span>
      <div className="rounded-lg flex flex-col items-center gap-y-3 ">
        <span className="font-mono text-5xl sm:text-6xl">Register</span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-lg sm:w-full sm:max-w-xs "
        >
          <label htmlFor="username" className="font-semibold my-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="pl-2 py-1.5 rounded-md  text-gray-900 placeholder:text-slate-600 placeholder:text-sm ring-1 ring-slate-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none "
            {...register("username", {
              required: "Username is required...",
              minLength: {
                value: 3,
                message: "at-least 3 characters required",
              },
              maxLength: {
                value: 50,
                message: "at-most 50 characters valid",
              },
            })}
          />
          {errors.username && (
            <p className=" text-red-500 text-sm font-semibold">
              {errors.username.message}
            </p>
          )}

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
            <p className=" text-red-500 text-sm font-semibold">
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
              required: "Password is required...",
              minLength: {
                value: 6,
                message: "at-least 6 characters required",
              },
            })}
          />
          {errors.password && (
            <p className=" text-red-500 text-sm font-semibold">
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="bg-indigo-800 text-white rounded-lg p-1.5 mt-6 hover:bg-indigo-600  "
          >
            Register
          </button>
        </form>
        <p className="text-center text-slate-900 font-medium">
            Already have account?
            <NavLink to={"/login"} className="text-indigo-800">
              Log In
            </NavLink>
          </p>
      </div>
    </div>
  );
}
