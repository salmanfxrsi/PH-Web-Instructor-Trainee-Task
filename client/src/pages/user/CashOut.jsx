import { useState } from "react";
import toast from "react-hot-toast";
import useUserInfo from "../../hooks/useUserInfo";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const CashOut = () => {
  const [error, setError] = useState("");
  const { isLoading, userInfo, refetch } = useUserInfo();
  const axiosPublic = useAxiosPublic();

  // Show loading state
  if (isLoading) return null; // Return null while loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    const form = e.target;
    const agentMobile = form.agentMobile.value;
    const amount = Number(form.amount.value);
    const enteredPin = Number(form.pin.value);
    const body = { agentMobile, amount, ...userInfo };

    // Validation checks
    if (agentMobile.length !== 11) {
      return setError("Wrong Phone Number");
    }
    if (amount > userInfo.balance) {
      return setError("You have not enough balance");
    }
    if (amount < 50) {
      return setError("Minimum amount 50 Taka");
    }
    if (enteredPin !== userInfo.pin) {
      return setError("PIN not matched");

    }
    try {
        const { data } = await axiosPublic.post(
          `/cash-out/${userInfo._id}`,
          body
        );
        if (data.insertedId) {
          refetch(); // Refetch user info
          e.target.reset(); // Reset form fields
          toast.success("Cash Out Successful")
        }
      } catch (error) {
        toast.error(error.response.data.error); // Show error message
      }
  };

  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Login Information Section */}
        <div className="text-center lg:text-left text-white">
          <h1 className="text-5xl font-bold">Cash Out Now!</h1>
          <p className="py-6">
            Users can seamlessly cash out through authorized agents using PH
            PayGO, with a 1.5% fee applied to each transaction. To proceed,
            users must provide the amount and PIN. Upon successful cash-out, the
            user&apos;s balance updates, and the agent receives the withdrawn
            amount along with 1% commission, while the admin earns 0.5% of the
            transaction. The total money in the system updates accordingly,
            ensuring transparency. Additionally, users receive a real-time
            transaction notification, making the process smooth, secure, and
            hassle-free.
          </p>
        </div>

        {/* Send Money Form Section */}
        <div className="card w-full max-w-sm">
          <form onSubmit={handleSubmit} className="card-body space-y-2">
            {/* Phone Number Input */}
            <div className="form-control">
              <label htmlFor="mobile" className="font-semibold text-white">
                Agent Number
              </label>
              <input
                id="agentMobile"
                type="number"
                name="agentMobile"
                placeholder="Enter your number"
                autoComplete="off"
                className="input input-bordered bg-white rounded-lg border border-gray-300 mt-1"
                required
              />
            </div>

            {/* Total Amount Input */}
            <div className="form-control">
              <label htmlFor="amount" className="font-semibold text-white">
                Total Amount
              </label>
              <input
                id="amount"
                type="number" // Changed type to number for validation
                name="amount"
                placeholder="Enter your amount"
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
                name="pin"
                placeholder="Enter your PIN"
                className="input input-bordered bg-white rounded-lg border border-gray-300 mt-1"
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mt-1 font-black">{error}</p>}

            {/* Send Money Button */}
            <div className="form-control mt-2">
              <button className="w-full bg-gradient-to-bl from-violet-500 to-fuchsia-500 py-2 px-5 font-bold text-white rounded-lg transition duration-300 hover:opacity-90">
                Cash Out
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CashOut;
