import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/ph_logo.svg";
import taka from "../../assets/taka.png";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  return (
    <div className="flex flex-col lg:flex-row gap-2 justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center">
        <img className="w-16 h-16" src={logo} alt="PH PayGO Logo" />
        <h3 className="text-white text-xl font-bold mt-2 -ml-3">PH PayGO</h3>
      </div>

      {/* Navigation Links and User Info */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 items-center">
        {/* Navigation Links */}
        <nav className="text-white flex gap-6 font-medium">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Send Money</NavLink>
          <NavLink to="/">Cash In</NavLink>
          <NavLink to="/">Cash Out</NavLink>
        </nav>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Balance Display */}
              <div className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 flex items-center rounded-3xl px-5 py-0.5 gap-1.5">
                <img className="w-6 h-6" src={taka} alt="Taka Icon" />
                <h1 className="text-xl font-medium text-white">1000 BDT</h1>
              </div>

              {/* User Dropdown */}
              <div className="dropdown dropdown-bottom dropdown-left">
                <div tabIndex={0} role="button" className="m-1">
                  <div className="avatar avatar-online">
                    <div className="w-12 rounded-full">
                      <img
                        src="https://i.ibb.co.com/JW2wFB6p/images.jpg"
                        alt="User Profile"
                      />
                    </div>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="border border-purple-500 menu dropdown-content bg-[#010313] -mr-12 mt-6 rounded-box z-[1] w-52 p-2 text-white font-medium shadow-2xl"
                >
                  <NavLink to="/">Home</NavLink>
                  <button
                    onClick={logOut}
                    className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 py-0.5 px-5 font-bold text-white rounded-sm uppercase mt-4"
                  >
                    Logout
                  </button>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Authentication Buttons */}
              <Link
                to="/login"
                className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 py-2 px-5 font-bold text-white rounded-sm"
              >
                Login Now
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 py-2 px-5 font-bold text-white rounded-sm"
              >
                Register Now
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
