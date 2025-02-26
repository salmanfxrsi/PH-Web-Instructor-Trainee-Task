import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserInfo from "../../hooks/useUserInfo";

const UserTransactionHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { isLoading: isUserLoading, userInfo } = useUserInfo();

  // Fetching Transaction History
  const { isLoading: isDataLoading, data = [] } = useQuery({
    queryKey: ["transactionHistory", userInfo?._id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/transaction-history-specific-user/${userInfo?._id}`
      );
      return data;
    },
    enabled: !!userInfo?._id,
  });

  if (isUserLoading || isDataLoading) return null;

  return (
    <div className="container mx-auto">
      {data.length > 0 ? (
        <div className="overflow-x-auto text-white bg-black">
          <table className="table">
            {/* Table Head */}
            <thead className="text-white bg-gradient-to-bl from-violet-500 to-fuchsia-500">
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
              {data.map((history, index) => (
                <tr key={history._id}>
                  <td>{index + 1}</td>
                  <td className="flex items-center gap-2">
                    <p>{history?.agentMobile || history?.receiverMobile}</p>
                    <div className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 px-4 rounded-2xl font-medium text-[10px]">
                      {history?.agentMobile ? "AGENT" : "USER"}
                    </div>
                  </td>
                  <td>BDT {history?.amount}</td>
                  <td>{new Date(history?.timestamp).toLocaleString()}</td>
                  <td>{history?.type}</td>
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

export default UserTransactionHistory;
