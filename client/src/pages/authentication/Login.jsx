import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { logIn, setUser } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    const form = e.target;
    const email = form.email.value;
    const pin = form.pin.value;

    // Validate PIN length
    if (pin.length !== 6) {
      setError("Pin must be 6 digits");
      return;
    }

    try {
      const result = await logIn(email, Number(pin));
      setUser(result.user);
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Login Information Section */}
        <div className="text-center lg:text-left text-white">
          <h1 className="text-5xl font-bold">Login Now!</h1>
          <p className="py-6">
            PH PayGO offers a fast and secure way to access your mobile banking
            services. Log in effortlessly with your registered mobile number and
            PIN to enjoy seamless transactions, including money transfers,
            cash-in, cash-out, and balance inquiries— all within a safe and
            user-friendly platform.
          </p>
        </div>

        {/* Login Form Section */}
        <div className="card w-full max-w-sm">
          <form onSubmit={handleSubmit} className="card-body space-y-2">
            {/* Email Input */}
            <div className="form-control">
              <label htmlFor="email" className="font-semibold text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="off"
                className="input input-bordered bg-white rounded-lg border border-gray-300 font-serif mt-1"
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
                name="pin"
                placeholder="Enter your PIN"
                className="input input-bordered bg-white rounded-lg border border-gray-300 mt-1"
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mt-1 font-black">{error}</p>}

            {/* Login Button */}
            <div className="form-control mt-2">
              <button className="w-full bg-gradient-to-bl from-violet-500 to-fuchsia-500 py-2 px-5 font-bold text-white rounded-lg transition duration-300 hover:opacity-90">
                Login Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
