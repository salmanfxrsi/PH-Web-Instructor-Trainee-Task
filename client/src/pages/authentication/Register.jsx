import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const Register = () => {
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const { signUp, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const pin = form.pin.value;
    const mobile = form.mobile.value;
    const email = form.email.value;
    const accountType = form.accountType.value;
    const nid = form.nid.value;
    let balance = 40;

    // Refresh Error State
    setError("");

    // Pin Length Validation
    if (pin.length !== 6) return setError("Pin must be in 6 Digits");

    if (accountType === "agent") balance = 100000;

    const userInfo = {
      name,
      pin: Number(pin),
      mobile,
      email,
      accountType,
      nid,
      balance,
      status: "active",
    };

    signUp(email, pin).then(async (result) => {
      try {
        await axiosPublic.post("/users", userInfo);
        setUser(result.user);
        toast.success("Registration Successful");
        navigate("/");
      } catch (error) {
        toast.error(error.message);
      }
    });
  };

  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Registration Text Section */}
        <div className="text-center lg:text-left text-white">
          <h1 className="text-5xl font-bold">Register Now!</h1>
          <p className="py-6">
            PH PayGO offers a fast and secure way to access your mobile banking
            services. Register with your mobile number and PIN to enjoy seamless
            transactions, including money transfers, cash-in, cash-out, and
            balance inquiries—all within a safe and user-friendly platform.
          </p>
        </div>

        {/* Registration Form Section */}
        <div className="card w-full max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="card-body grid grid-cols-2 gap-4"
          >
            {/* Name Input */}
            <div className="form-control">
              <label htmlFor="name" className="font-semibold text-white">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                name="name"
                autoComplete="off"
                className="input input-bordered bg-white rounded-lg border border-gray-300 mt-1"
                required
              />
            </div>

            {/* PIN Input */}
            <div className="form-control">
              <label htmlFor="pin" className="font-semibold text-white">
                PIN
              </label>
              <input
                id="pin"
                type="number"
                placeholder="Enter your PIN"
                name="pin"
                className="input input-bordered bg-white rounded-lg border border-gray-300 mt-1"
                required
              />
            </div>

            {/* Mobile Number Input */}
            <div className="form-control">
              <label htmlFor="mobile" className="font-semibold text-white">
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                placeholder="Enter your number"
                name="mobile"
                autoComplete="off"
                className="input input-bordered bg-white rounded-lg border border-gray-300 mt-1"
                required
              />
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label htmlFor="email" className="font-semibold text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                name="email"
                autoComplete="off"
                className="input input-bordered bg-white rounded-lg border border-gray-300 mt-1"
                required
              />
            </div>

            {/* Account Type Dropdown */}
            <div className="form-control">
              <label htmlFor="accountType" className="font-semibold text-white">
                Account Type
              </label>
              <select
                id="accountType"
                name="accountType"
                className="input input-bordered bg-white rounded-lg border border-gray-300 mt-1"
                required
              >
                <option defaultValue="user" disabled>
                  Select account type
                </option>
                <option value="user">User</option>
                <option value="agent">Agent</option>
              </select>
            </div>

            {/* NID Input */}
            <div className="form-control">
              <label htmlFor="nid" className="font-semibold text-white">
                NID
              </label>
              <input
                id="nid"
                type="text"
                placeholder="Enter your NID"
                name="nid"
                autoComplete="off"
                className="input input-bordered bg-white rounded-lg border border-gray-300 mt-1"
                required
              />
            </div>

            {/* Show Error */}
            <p className="text-red-500 mt-1 font-black">{error}</p>

            {/* Register Button */}
            <div className="form-control mt-2 col-span-2">
              <button className="w-full bg-gradient-to-bl from-violet-500 to-fuchsia-500 py-2 px-5 font-bold text-white rounded-lg transition duration-300 hover:opacity-90">
                Register Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
