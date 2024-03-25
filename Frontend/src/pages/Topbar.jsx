import { NavLink } from "react-router-dom";

const Topbar = () => {
  return (
    <nav className="bg-white px-10 h-[50px] flex items-center">
      <div className="w-full flex justify-between text-gray-500">
        <ul className="uppercase list-none flex gap-5  font-semibold ">
          <li>
            <NavLink className="aria-[current=page]:text-red-400 " to={"/"}>
              home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="aria-[current=page]:text-red-400 "
              to={"/write"}
            >
              write
            </NavLink>
          </li>
        </ul>

        <ul className="uppercase list-none flex gap-5 font-semibold ">
          <li>
            <NavLink
              className="aria-[current=page]:text-red-400 "
              to={"/login"}
            >
              login
            </NavLink>
          </li>
          <li>
            <NavLink
              className="aria-[current=page]:text-red-400 "
              to={"/register"}
            >
              register
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Topbar;
