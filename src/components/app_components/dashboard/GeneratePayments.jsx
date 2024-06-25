import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
import PaymentTable from "./PaymentTable";
const GeneratePayments = () => {

    const year = new Date().getFullYear();
    const axiosSecure = useAxiosSecure()
    const [users, setUsers] = useState([]);
    const [currentMonth, setCurrentMonth] = useState('');

    const [page, setPage] = useState(1);
    // const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const handleGenerate = (e) => {
        e.preventDefault();
        const month = e.target.month.value + year
        setCurrentMonth(month)

       toast.promise(
        axiosSecure.post('/payments/', {month, page, limit:50}),
        {
            loading: 'Generating...',
            success: data => {
                // console.log(data.data)
                setUsers(data.data.payments)
                setTotalPages(data.data.totalPages)

                return "Generated!"
            },
            error: err => {
                console.error(err)
                return "Something went wrong"
            }
        }
       )

    }

    const handleUpdate = (page) => {
       
        axiosSecure.post('/payments/', {month:currentMonth, page, limit:50})
        .then(res => {
            setUsers(res.data.payments)
            setTotalPages(res.data.totalPages)
        })
        .catch(err => {
            console.error(err)
        })

    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            console.log("new page:", newPage)
          setPage(newPage);
          handleUpdate(newPage)
          
        }
      };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Bill Collection {year}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleGenerate} className="grid grid-cols-3 gap-3">
                    <Select  name="month">
            <SelectTrigger className="">
                <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="January">January</SelectItem>
                <SelectItem value="February">February</SelectItem>
                <SelectItem value="March">March</SelectItem>
                <SelectItem value="April">April</SelectItem>
                <SelectItem value="May">May</SelectItem>
                <SelectItem value="June">June</SelectItem>
                <SelectItem value="July">July</SelectItem>
                <SelectItem value="August">August</SelectItem>
                <SelectItem value="September">September</SelectItem>
                <SelectItem value="October">October</SelectItem>
                <SelectItem value="November">November</SelectItem>
                <SelectItem value="December">December</SelectItem>
            </SelectContent>
            </Select>

            <div>
                <Button>Generate</Button>
            </div>
                    </form>

                    <div className="mt-5">
                    <PaymentTable users={users} currentPage={page} totalPages={totalPages} handlePageChange={handlePageChange} month={currentMonth} handleUpdate={handleUpdate}/>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
};

export default GeneratePayments;