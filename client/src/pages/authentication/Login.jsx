import { useState } from "react";

const Login = () => {
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    // Refresh Error State
    setError("");

    e.preventDefault();
    const form = e.target;
    const pin = form.pin.value;
    const email = form.email.value;

    // Pin Length Validation
    if (pin.length !== 5) return setError("Pin must be in 5 Digits");

    const userInfo = { pin: Number(pin), email };
    console.log(userInfo);
  };

  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Login Text Section */}
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
                placeholder="Enter your email"
                name="email"
                autoComplete="off"
                className="input input-bordered bg-white rounded-lg border border-gray-300 font-serif mt-1"
                required
              />
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label htmlFor="password" className="font-semibold text-white">
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

            {/* Show Error */}
            <p className="text-red-500 mt-1 font-black">{error}</p>

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
