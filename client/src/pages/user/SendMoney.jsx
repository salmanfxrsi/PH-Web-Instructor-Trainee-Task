import { useState } from "react";
import toast from "react-hot-toast";
import useUserInfo from "../../hooks/useUserInfo";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SendMoney = () => {
  const [error, setError] = useState("");
  const { isLoading, userInfo, refetch } = useUserInfo();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Show loading state
  if (isLoading) return null; // Return null while loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    const form = e.target;
    const receiverMobile = form.mobile.value;
    const amount = Number(form.amount.value);
    const enteredPin = Number(form.pin.value);
    const body = { receiverMobile, amount, ...userInfo };

    // Validation checks
    if (receiverMobile.length !== 11) {
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
        `/send-money/${userInfo._id}`,
        body
      );
      if (data.insertedId) {
        refetch(); // Refetch user info
        e.target.reset(); // Reset form fields
        toast.success("Send Money Successful");
        navigate('/user-transition-history')
      }
    } catch (error) {
      toast.error(error.response.data.message); // Show error message
    }
  };

  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Login Information Section */}
        <div className="text-center lg:text-left text-white">
          <h1 className="text-5xl font-bold">Send Money Now!</h1>
          <p className="py-6">
            Easily send money with PH PayGO and enjoy a seamless transaction
            experience! Users can send a minimum of 50 Taka, and transactions
            over 100 Taka will incur a 5 Taka fee. Both sender and receiver
            balances update instantly, and the 5 Taka fee goes to the admin
            account. The system total balance updates automatically, and users
            receive a real-time transaction notification. Enjoy fast, secure,
            and hassle-free money transfers!
          </p>
        </div>

        {/* Send Money Form Section */}
        <div className="card w-full max-w-sm">
          <form onSubmit={handleSubmit} className="card-body space-y-2">
            {/* Phone Number Input */}
            <div className="form-control">
              <label htmlFor="mobile" className="font-semibold text-white">
                Phone Number
              </label>
              <input
                id="mobile"
                type="number"
                name="mobile"
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
                Send Money
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
