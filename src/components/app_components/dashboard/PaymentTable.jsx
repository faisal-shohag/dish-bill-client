
import Loading from "../common/Loading";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import {Badge} from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Edit, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Pagination from "./Pagination";
import { Description, Dialog, DialogPanel, DialogTitle,  } from '@headlessui/react'
import PropTypes from 'prop-types';

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const PaymentTable = ({users, currentPage, totalPages, handlePageChange, month, handleUpdate }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [bill, setBill] = useState(0)
    const billRef = useRef()
    const [paymentId, setPaymentId] = useState(null)
    const axiosSecure = useAxiosSecure()

    const handleCollection = () => {
        setIsOpen(false)
        toast.promise(
            axiosSecure.put(`/payments/${paymentId}`, {amount: billRef.current.value, status: "pending"}),
            {
                loading: 'Please wait...',
                success: () => {
                    setBill(0)
                    handleUpdate(currentPage)
                    return `Collected!`
                },
                error: (err) => {
                    return err.message
                }
            }
        )
        // console.log(billRef.current.value, paymentId)

    }

  return (
    <> { users.length !== 0  &&
    <div>
      {users ? (
        <Card>
            <CardHeader>
              <CardTitle>Collect Bill for the {month}</CardTitle>
              
              <CardDescription>
               Manage all users.
               {/* <form onSubmit={handleSearch} className="float-right flex gap-2">
                    <Input name="search" type="text" placeholder="Search with ID, name, phone and email..."/>
                    <Button><Search className="mr-2 w-5 h-5"/> Search</Button>
              
                </form> */}
              </CardDescription>
            </CardHeader>
            <CardContent>
              
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              <TableHead>
                <span className="">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
               
                <TableCell className="font-medium">{user.name}   <Badge className={user.status === "active" ? "bg-green-500 text-white" : "bg-red-500 text-white"} variant="outline">{user.status}</Badge></TableCell>
                <TableCell><Badge>{user.payment.status === "not-collected" ? "Not Collected" : user.payment.amount}</Badge></TableCell>
                <TableCell>
                {user.location}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.phone}
                </TableCell>
                <TableCell>
                  <div className="block lg:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <span className="hidden lg:block">
                    <div className="flex items-center gap-2">
                      <Button onClick={() =>{ setIsOpen(true); setBill(user.bill); setPaymentId(user.payment.id)}}>
                        <Check className="mr-2 h-4 w-4" /> {user.payment.status === "not-collected" ? "Collect" : "Collected"}
                      </Button>
                      <Link to={`/staff/edit-user/${user.id}`}><Button>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button></Link>
                    </div>
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> 

        </CardContent>
        <CardFooter>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </CardFooter>
        </Card>
      ) : (
        <Loading />
      )}

<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed  inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg rounded-md shadow-2xl space-y-4 border bg-white p-8 dark:bg-gray-900 min-w-[500px]">
            <DialogTitle className="font-bold">Collect Payment</DialogTitle>
            <Description></Description>
              <Input
              type="number"
              placeholder="Bill"
              defaultValue={bill}
              ref={billRef}
              />
            <div className="flex gap-4">
              <Button variant="destructive" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleCollection}>Confirm</Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>

    
    }</>
  );
};


PaymentTable.propTypes = {
  users: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  month: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default PaymentTable;
