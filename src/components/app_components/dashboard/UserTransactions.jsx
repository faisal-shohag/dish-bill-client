import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { dateFormate } from "@/lib/common";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { Badge } from "@/components/ui/badge";

const UserTransactions = ({id}) => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosSecure.get(`/users/${id}/payments`,);
        setTransactions(response.data.payments);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTransactions();
  }, [currentPage, axiosSecure, id]);


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


    return (
        <div>
          <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Payments</CardTitle>
                <CardDescription>
                  All the payments from this user.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                 {
                  transactions.map((t, index) => {
                    return  <TableRow key={index}>
                    <TableCell>{dateFormate(t.date)} - ({t.month})</TableCell>
                    <TableCell><Badge>{t.status}</Badge></TableCell>
                    <TableCell className="text-right">${t.amount}</TableCell>
                  </TableRow>
                  })
                 }
                </TableBody>
              </Table> : <p className="text-center">There is no payment history for this user!</p>}
            </CardContent>
            <CardFooter>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
            </CardFooter>
          </Card>
            
        </div>
    );
};

UserTransactions.propTypes={
  id: PropTypes.number.isRequired,
}



export default UserTransactions;