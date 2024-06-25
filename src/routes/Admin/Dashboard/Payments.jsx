import Loading from '@/components/app_components/common/Loading';
import DashboardCard from '@/components/app_components/dashboard/DashboardCard';
import PaymentReportTable from '@/components/app_components/dashboard/PaymentReportTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Payments = () => {
    const [stat, setStat] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [payments, setPayments] = useState([]);
    const [totalReport, setTotalReport] = useState(null);

    const [isData, setIsData] = useState(false)

    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get('/payments-statistics')
            .then(res => {
                setStat(res.data)
            })
    }, [axiosSecure])

    const handleReport = (e) => {
        e.preventDefault();
        const form = e.target;
        const start = form.startDate.value;
        const end = form.endDate.value;
        setStartDate(start)
        setEndDate(end)

        toast.promise(
            axiosSecure.get('/payments-report',{ params: {
                    startDate: start,
                    endDate: end
                }
            })
            .then(res => {
                setPayments(res.data.payments)
                setTotalReport(res.data)
                setIsData(true)
            })
            .catch(err => {
                console.log(err)
                throw new Error('Failed to Generate Report')
            }), {
                loading: 'Generating Report...',
                success: 'Report Generated Successfully',
                error: 'Failed to Generate Report'
            }
        )
    }

    const updateData = () => {
        axiosSecure.get('/payments-report',{ params: {
            startDate,
            endDate
        }
    })
    .then(res => {
        setPayments(res.data.payments)
        setTotalReport(res.data)
        // setIsData(true)
    })
    .catch(err => {
        console.log(err)
        throw new Error('Failed to Generate Report')
    })
    }
    

    return (
        <div>
           {
            stat ?  <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-3'>
                <DashboardCard title='Total Paid Payments' icon={<DollarSign/>} num={stat.totalPaidPayments}/>
                <DashboardCard title='Total Pending Payments' icon={<DollarSign/>} num={stat.totalPendingPayments}/>
                <DashboardCard title='Paid This Month' icon={<DollarSign/>} num={stat.totalPaidThisMonth}/>
                <DashboardCard title='Pending This Month' icon={<DollarSign/>} num={stat.totalPendingThisMonth}/>
                
            </div> : <Loading/>
           }
           <div className='mt-10 border p-5 rounded-xl'>
            <div className='mb-4 text-xl font-semibold'>Generate Payments Report</div>
            <form onSubmit={handleReport} className='grid grid-cols-3 items-end gap-3'>
            <div>
                <Label>
                    Start Date
                <Input type="date" name="startDate"/>
                </Label>
            </div>

            <div>
                <Label>
                    End Date
                <Input type="date" name="endDate"/>
                </Label>
            </div>

            <div><Button type="submit">Generate</Button></div>
            </form>
           {totalReport && <div className='grid lg:grid-cols-4 mt-4 gap-3 md:grid-cols-2 grid-cols-1'>
                <DashboardCard title="Total Paid" icon={<DollarSign/>} num={totalReport.totalPaid}/>
                <DashboardCard title="Total Pending" icon={<DollarSign/>} num={totalReport.totalPending}/>
            </div>}
            <div className='mt-4'>
            {isData && <PaymentReportTable transactions={payments} startDate={startDate} endDate={endDate} updateData={updateData}/>}
            </div>
           </div>
        </div>
    );
};

export default Payments;