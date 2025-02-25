import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUserInfo = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const fetchUserInfo = async () => {
    if (!user?.email) return null;
    const { data } = await axiosPublic.get(`/user-info?email=${user.email}`);
    return data;
  };

  const { isLoading, data: userInfo, refetch } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: fetchUserInfo,
    enabled: !!user?.email, // Prevents execution if no email is available
  });

  return { isLoading, userInfo, refetch };
};

export default useUserInfo;
