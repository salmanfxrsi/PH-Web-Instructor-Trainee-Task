import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/ph_logo.svg";
import taka from "../../assets/taka.png";
import useAuth from "../../hooks/useAuth";
import useUserInfo from "../../hooks/useUserInfo";
import { useState } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { userInfo } = useUserInfo();
  const [showBalance, setShowBalance] = useState(false);

  // Common navigation links
  const commonNavigationLink = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="about">About Us</NavLink>
      <NavLink to="/">Ongoing Offer</NavLink>
      <NavLink to="contact">Contact</NavLink>
    </>
  );

  // Role-based navigation links
  const navigationLinks = {
    user: (
      <>
        <NavLink to="send-money">Send Money</NavLink>
        <NavLink to="cash-out">Cash Out</NavLink>
        <NavLink to="user-transaction-history">Transition History</NavLink>
      </>
    ),
    agent: (
      <>
        <NavLink to="/">Balance Inquiry</NavLink>
        <NavLink to="/">Cash-In Requests</NavLink>
        <NavLink to="agent-cash-out-transaction">Cash-Out Transactions</NavLink>
        <NavLink to="/">Earnings Overview</NavLink>
        <NavLink to="/">Request Balance Recharge</NavLink>
      </>
    ),
    admin: (
      <>
        <NavLink to="user-agent-management">User & Agent Management</NavLink>
        <NavLink to="/">Agent Approval Requests</NavLink>
        <NavLink to="/">Transactions Monitoring</NavLink>
        <NavLink to="system-balance-overview">System Balance Overview</NavLink>
      </>
    ),
  };

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
        <nav className="text-white flex gap-6 font-medium flex-wrap justify-center">
          {commonNavigationLink}
        </nav>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Balance Display */}
              <div
                onClick={() => setShowBalance(!showBalance)}
                className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 flex items-center rounded-3xl px-5 py-0.5 gap-1.5"
              >
                <img className="w-6 h-6" src={taka} alt="Taka Icon" />
                <h1 className="text-xl font-medium text-white">
                  {showBalance ? userInfo?.balance : "******"}
                </h1>
              </div>

              {/* User Dropdown */}
              <div className="dropdown dropdown-bottom dropdown-left">
                <div tabIndex={0} role="button" className="m-1">
                  <div className="avatar avatar-online">
                    <div className="w-12 rounded-full">
                      <img
                        src="https://i.ibb.co.com/ZzbfxJrg/images.jpg"
                        alt="User Profile"
                      />
                    </div>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="border border-purple-500 menu dropdown-content bg-[#010313] -mr-12 mt-6 rounded-box z-[1] w-52 p-2 text-white font-medium shadow-2xl"
                >
                  {navigationLinks[userInfo?.accountType]}
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
