import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const UserAgentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // Fetching Transaction History
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?search=${search}`);
      return data;
    },
  });

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
    <div className="w-11/12 lg:container mx-auto">
      {/* Search Section */}
      <div className="mb-16 flex gap-10 justify-between items-center">
        {/* Search Bar */}
        <div className="flex items-center w-[500px] rounded-lg border-2 border-white">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 outline-none text-lg text-white px-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-6 justify-center">
          {/* Reset Button */}
          <button
            onClick={() => setSearch("")}
            className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 px-10 font-bold text-white rounded-sm uppercase py-4"
          >
            <h1>Reset</h1>
          </button>
        </div>
      </div>
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
                    to={
                      user?.accountType === "user"
                        ? `/user-history/${user._id}`
                        : `/agent-history/${user?.mobile}`
                    }
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
