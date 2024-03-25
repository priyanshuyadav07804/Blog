import { useForm } from "react-hook-form";

const Reset_Password = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => console.log(values);
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8 pb-12 bg-yellow-500">
          <h1 className="text-2xl font-bold font-serif sm:text-7xl">Tridium</h1>
          

  <span className="sm:w-3/5 mt-10  px-10 py-2 mx-auto bg-green-100 text-xs text-wrap sm:text-base text-green-700 flex items-center justify-center font-semibold">Success! Please check your email to verify account</span>
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">

    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Reset Password</h2>
  </div>

  <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}
>
      <div>
        <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900">OTP</label>
        <div className="mt-2">
          <input id="otp" name="otp" type="otp" placeholder="Enter Your OTP" autoComplete="otp"  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...register("otp", {
            required: "OTP is required...",
            minLength: {
              value: 6,
              message: "at-least 6 characters required",
            },
          })}
          />
          {errors.otp && (
            <p className=" text-red-800 text-md tracking-widest  font-bold">
              {errors.otp.message}
            </p>
          )}
        </div>
      </div>

      <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
        <div className="mt-2">
          <input id="password" name="password" type="password"  placeholder="Enter New Password" autoComplete="current-password"  className=" pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          {...register("password", {
            required: "Password is required...",
            minLength: {
              value: 6,
              message: "at-least 6 characters required",
            },
          })}
          />
          {errors.password && (
            <p className=" text-red-800 text-md tracking-widest  font-bold">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Reset Token</button>
      </div>
    </form>

  </div>
</div>
  )
}

export default Reset_Password
