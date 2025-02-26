import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const UserAgentManagement = () => {
  const axiosSecure = useAxiosSecure();

  // Fetching Transaction History
  const {
    isLoading: isUsersLoading,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });

  if (isUsersLoading) return null;

  //   Handle Status
  const handleStatus = async (id, status) => {
    try {
      await axiosSecure.patch(
        `/update-user-status/${id}?status=${
          status === "active" ? "block" : "active"
        }`
      );
      refetch();
      toast.success("Status Changed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto text-white bg-black">
        <table className="table">
          {/* Table Head */}
          <thead className="text-white bg-gradient-to-bl from-violet-500 to-fuchsia-500">
            <tr>
              <th>#</th>
              <th>User Info</th>
              <th>Number and NID</th>
              <th>Balance</th>
              <th>Status</th>
              <th>History</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://i.ibb.co.com/ZzbfxJrg/images.jpg"
                          alt="User Profile"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {user?.name} | {user?.accountType}
                      </div>
                      <div className="text-sm opacity-50">
                        User Id: {user?._id}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">{user?.mobile}</div>
                    <div className="text-sm opacity-50">NID: {user?.nid}</div>
                  </div>
                </td>
                <th>
                  <div>
                    <div className="font-bold">BDT {user?.balance}</div>
                    <div className="text-sm opacity-50">PIN: {user?.pin}</div>
                  </div>
                </th>
                <th>
                  <button
                    onClick={() => handleStatus(user._id, user.status)}
                    className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 py-1 px-5 font-bold text-white rounded-sm cursor-pointer text-[10px]"
                  >
                    {user?.status === "active" ? "Block Now" : "Unblock Now"}
                  </button>
                </th>
                <th>
                  <Link
                    to={`/user-history/${user._id}`}
                    className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 py-1 px-5 font-bold text-white rounded-sm cursor-pointer text-[10px]"
                  >
                    See History
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAgentManagement;
