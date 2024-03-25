import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className=" bg-yellow-500 h-[450px] py-20 px-6 flex flex-col gap-6 md:px-36">
      <h1 className="font-bold font-serif text-7xl">Tridium</h1>
      <p className="font-semibold text-2xl">
        Discover stories, thinking, and expertise from writers on any topic.
      </p>
      <NavLink to={'/register'} className="w-fit bg-black text-white text-xl rounded-lg px-10 py-3">Start Reading</NavLink>
    </div>
  );
};

export default Header;
