import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import taka from "../../assets/taka.png";

const SystemBalanceOverview = () => {
  const axiosSecure = useAxiosSecure();
  const [showBalance, setShowBalance] = useState(false);

  // Fetching System Balance
  const { isLoading, data: systemBalance } = useQuery({
    queryKey: ["systemBalance"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/system-balance");
      return data;
    },
  });

  if (isLoading) return null;

  return (
    <div className="flex justify-center">
      <div className="stats bg-gradient-to-bl from-violet-500 to-fuchsia-500 text-white p-4 rounded-lg shadow-lg">
        {/* Balance Check Credential */}
        <div className="stat">
          <p className="text-sm font-medium">Balance Check Credential</p>
          <p className="text-sm font-black">
            {showBalance ? systemBalance?._id : "*********"}
          </p>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="bg-white text-black rounded-sm mt-2 px-3 py-1 text-sm font-medium transition duration-200 hover:bg-gray-200"
          >
            {showBalance ? "Hide Balance" : "Show Balance"}
          </button>
        </div>

        {/* System Balance */}
        <div className="stat">
          <h2 className="text-lg font-semibold">System Balance</h2>
          <div className="mt-2 flex items-center gap-2">
            <img className="w-8 h-8" src={taka} alt="Taka Icon" />
            <h1 className="text-2xl font-bold">
              {showBalance ? systemBalance?.total_money : "******"}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemBalanceOverview;
