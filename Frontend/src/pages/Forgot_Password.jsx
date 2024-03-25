/* eslint-disable react/no-unescaped-entities */
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useForm } from "react-hook-form";

export default function Forgot_Password() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => console.log(values);

  return (
    <div className="bg-yellow-500 flex min-h-full flex-col justify-center px-6 py-6 bg-cover gap-y-10  "
    >
      <h1 className="font-bold font-serif text-7xl">Tridium</h1>
      <div className="rounded-lg flex flex-col items-center gap-y-3 pb-6">
      <span className="sm:w-3/5 px-10 py-2 bg-green-100 text-xs text-wrap sm:text-base text-green-700 flex items-center justify-center font-semibold">Success! Please check your email to verify account</span>
        <span className="text-4xl sm:text-6xl font-semibold">Forgot password</span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-lg w-full max-w-xs "
        >
    
          <label htmlFor="email" className="font-semibold my-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pl-2 py-1.5 rounded-md text-gray-900 placeholder:text-slate-600 placeholder:text-sm ring-1 ring-slate-400  focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            {...register("email", {
              required: "Email is required...",
            })}
          />
          {errors.email && (
            <p className=" text-red-500 text-md tracking-widest font-semibold">
              {errors.email.message}
            </p>
          )}

        
          <button
            type="submit"
            className="bg-indigo-800 text-white rounded-lg p-1.5 mt-6 hover:bg-indigo-600  "
          >
            Get Reset Password Link
          </button>
        </form>

      </div>
    </div>
  );
}
