import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminByEmail = (email) => {
    const axiosSecure = useAxiosSecure();

    // Fetch users
    const { refetch, data: admin = {} } = useQuery({
        queryKey: ['admins'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admins/' + email);
            return res.data;
        }
    });



  return { admin, refetch };
};

export default useAdminByEmail;