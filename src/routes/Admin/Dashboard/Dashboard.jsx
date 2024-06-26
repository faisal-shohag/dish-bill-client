import Loading from "@/components/app_components/common/Loading";
import DashboardCard from "@/components/app_components/dashboard/DashboardCard";
import UserTable from "@/components/app_components/dashboard/UserTable";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AlertCircle, DollarSign, UserCheck2, UserRoundX, UsersRound } from "lucide-react";
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
            {stats.pendingPaymentsCount > 0 && <div className="p-3 mb-2 flex items-center border rounded-xl bg-red-200 shadow font-semibold text-red-500">
                <AlertCircle className="mr-2 h-5 w-5"/> <span>You have {stats.pendingPaymentsCount} Pending payments. Confirm them now!</span>
            </div>}
      <div className="revenue-amount font-bold text-3xl bg-gradient-to-r from-indigo-600 via-red-500 to-orange-400 text-transparent bg-clip-text">Your Total Revenue</div>
      <div className="revenue-amount font-bold text-3xl bg-gradient-to-r from-indigo-600 via-red-500 to-orange-400 inline-block text-transparent bg-clip-text">
        {stats.totalIncome}
      </div>
    </div>
             <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
                <DashboardCard title="Total users" icon={<UsersRound/>} num={stats.totalUsers}/>
                <DashboardCard title="Active users" icon={<UserCheck2/>} num={stats.totalActiveUsers}/>
                <DashboardCard title="Inactive Users" icon={<UserRoundX/>} num={stats.totalInactiveUsers}/>
                <DashboardCard title="This Month Collection" icon={<DollarSign/>} num={stats.thisMonthIncome}/>

            </div>
           </>
            : <Loading/>
            
        }

        <UserTable/>
           
        </>
    );
};

export default AdminDashboard;