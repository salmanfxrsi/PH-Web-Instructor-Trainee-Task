import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserInfo from "../../hooks/useUserInfo";

const AgentCashOutTransaction = () => {
  const axiosSecure = useAxiosSecure();
  const { isLoading: isUserLoading, userInfo } = useUserInfo();

  // Fetch user transaction history
  const { isLoading, data: transactions = [] } = useQuery({
    queryKey: ["agentCashOutHistory", userInfo?.mobile],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/transaction-history-specific-agent/${userInfo?.mobile}`
      );
      return response.data;
    },
  });

  // Show loading state
  if (isLoading || isUserLoading) return null;

  return (
    <div className="container mx-auto">
      {transactions.length > 0 ? (
        <div className="overflow-x-auto bg-black text-white rounded-lg shadow-lg">
          <table className="table w-full">
            {/* Table Head */}
            <thead className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 text-white">
              <tr>
                <th>#</th>
                <th>Number</th>
                <th>Amount</th>
                <th>Time</th>
                <th>Type</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((history, index) => (
                <tr key={history._id} className="border-b border-gray-700">
                  <td>{index + 1}</td>
                  <td>{history?.userMobile}</td>
                  <td>BDT {history.amount}</td>
                  <td>{new Date(history.timestamp).toLocaleString()}</td>
                  <td>{history.type}</td>
                  <td>{history._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-3xl mt-28 text-center text-white font-medium">
          No Transaction History Found
        </h1>
      )}
    </div>
  );
};

export default AgentCashOutTransaction;
