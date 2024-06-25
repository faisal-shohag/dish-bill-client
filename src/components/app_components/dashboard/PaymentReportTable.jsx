
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
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

  import PropTypes from "prop-types";
import toast from "react-hot-toast";


const PaymentReportTable = ({transactions, startDate, endDate, updateData}) => {
    const axiosSecure = useAxiosSecure();

    const handlePaid = (id, amount, status) => {
        toast.promise(
            axiosSecure.put('payments/'+id, {status, amount})
            .then(() => {
                updateData();
            }),
            {
                loading: 'Updating...',
                success: 'Updated successfully',
                error: 'Failed to update'
            }
        )
    }

    return (
        <div>
          <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Payments Report({dateFormate(startDate)} to {dateFormate(endDate)})</CardTitle>
                <CardDescription>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className=" md:hidden lg:block hidden">Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                 {
                  transactions.map((t) => {
                    return  <TableRow key={t.id}>
                    <TableCell>
                      <div className="font-medium">{t.user.name}</div>
                    </TableCell>
                    <TableCell className="md:hidden lg:block hidden">{dateFormate(t.date)}</TableCell>
                    <TableCell className="text-right">${t.amount}</TableCell>
                    <TableCell className="text-right"><Badge>{t.status}</Badge></TableCell>
                    <TableCell className="text-right">
                        <Button className={t.status == "paid" ? "bg-red-500 text-white":"bg-green-500 text-white"} onClick={()=>handlePaid(t.id, t.amount, t.status == "paid" ? "pending" : "paid")}>Make {t.status == "paid" ? "pending":"paid"}</Button>
                    </TableCell>
                  </TableRow>
                  })
                 }
                </TableBody>
              </Table>
            </CardContent>
          </Card>
            
        </div>
    );
};

PaymentReportTable.propTypes = {
    transactions: PropTypes.array.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    updateData: PropTypes.func.isRequired
};


export default PaymentReportTable;