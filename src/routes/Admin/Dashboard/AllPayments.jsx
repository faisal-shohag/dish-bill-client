import Loading from "@/components/app_components/common/Loading";
import DashboardCard from "@/components/app_components/dashboard/DashboardCard";
import PaymentsSearchTable from "@/components/app_components/dashboard/PaymentsSearchTable";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { DollarSign } from "lucide-react";
import { useEffect, useState } from "react";


const AllPayments = () => {
    const [stat, setStat] = useState(null);
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get('/payments-statistics')
            .then(res => {
                setStat(res.data)
            })
    }, [axiosSecure])


    return (
        <div>
            {
            stat ?  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
                <DashboardCard title='Total Paid Payments' icon={<DollarSign/>} num={stat.totalPaidPayments}/>
                <DashboardCard title='Total Pending Payments' icon={<DollarSign/>} num={stat.totalPendingPayments}/>
                <DashboardCard title='Paid This Month' icon={<DollarSign/>} num={stat.totalPaidThisMonth}/>
                <DashboardCard title='Pending This Month' icon={<DollarSign/>} num={stat.totalPendingThisMonth}/>
                <DashboardCard title='Total Not-Collected' icon={<DollarSign/>} num={stat.totalNotCollectedPayments}/>
                <DashboardCard title='Not-Collected This Month' icon={<DollarSign/>} num={stat.totalNotCollectedThisMonth}/>
                
            </div> : <Loading/>
           }

           <div className="mt-5">
            <PaymentsSearchTable/>
           </div>

           


        </div>
    );
};

export default AllPayments;