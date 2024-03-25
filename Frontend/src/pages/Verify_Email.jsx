import { NavLink, useLocation } from "react-router-dom";

const Verify_Email = () => {
  const location = useLocation().search.split("=");
  const token = location[1].split("&")[0];
  const email = location[2];
  console.log(email,token);
  const falt = false;

  return (
    <>
      <div className=" bg-yellow-500 h-[450px] py-20 px-6 flex flex-col gap-6 md:px-3 md:flex md:flex-col md:items-center md:justify-center">
        <h1 className="font-bold font-serif text-7xl">Tridium</h1>
        <p className="font-semibold text-2xl">
          {!falt ? "THANKS FOR SIGNING UP!" : falt}
        </p>
        <p className="font-semibold text-2xl">
          {!falt
            ? "Your Email Is Verified"
            : "Go and check your email link again"}
        </p>

        {!falt ? (
          <NavLink
            to={"/login"}
            className="w-fit bg-black text-white text-xl rounded-lg px-10 py-3"
          >
            Please Login
          </NavLink>
        ) : (
          <NavLink
            to={"/register"}
            className="w-fit bg-black text-white text-xl rounded-lg px-10 py-3"
          >
            Go Signup Page
          </NavLink>
        )}
      </div>
    </>
  );
};

export default Verify_Email;
