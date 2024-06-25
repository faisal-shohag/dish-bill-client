import Loading from "@/components/app_components/common/Loading";
import DashboardCard from "@/components/app_components/dashboard/DashboardCard";
import UserTable from "@/components/app_components/dashboard/UserTable";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { DollarSign, UserCheck2, UserRoundX, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
    const [stats, setStats] = useState({})
    const [isData, setIsData] = useState(false)
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/stats')
            .then(res => {
                setStats(res.data)
                setIsData(true)
            })
    }, [axiosSecure])

    return (
        <>
            { isData ? 
           <>
           <div>
      <div className="revenue-amount font-bold text-3xl bg-gradient-to-r from-indigo-600 via-red-500 to-orange-400 text-transparent bg-clip-text">Your Total Revenue</div>
      <div className="revenue-amount font-bold text-3xl bg-gradient-to-r from-indigo-600 via-red-500 to-orange-400 inline-block text-transparent bg-clip-text">
        {stats.totalIncome}
      </div>
    </div>
             <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
                <DashboardCard title="Total users" icon={<UsersRound/>} num={stats.totalUsers}/>
                <DashboardCard title="Active users" icon={<UserCheck2/>} num={stats.totalActiveUsers}/>
                <DashboardCard title="Inactive Users" icon={<UserRoundX/>} num={stats.totalInactiveUsers}/>
                <DashboardCard title="This Month" icon={<DollarSign/>} num={stats.thisMonthIncome}/>

            </div>
           </>
            : <Loading/>
            
        }

        <UserTable/>
           
        </>
    );
};

export default AdminDashboard;