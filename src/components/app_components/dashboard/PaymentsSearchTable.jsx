import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useRef, useState } from "react";
import Loading from "../common/Loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Check, Edit, MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Pagination from "./Pagination";
import { Input } from "@/components/ui/input";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import toast from "react-hot-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const PaymentsSearchTable = () => {
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(new Date().toLocaleString("default", { month: "long" })+ new Date().getFullYear());
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const amountRef = useRef(null);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axiosSecure.get("/payments-search", {
          params: {
            page: currentPage,
            limit: 10,
            search: search,
          },
        });

        setPayments(response.data.payments);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPayments();
  }, [currentPage, search, axiosSecure]);

  const handleSearch = (e) => {
    e.preventDefault();
    const d = new Date(e.target.month.value);
    const month = d.toLocaleString("default", { month: "long" });
    const now = `${month}${d.getFullYear()}`;
    setSearch(now + "|" + e.target.status.value);
    setCurrentPage(1);
  };
  
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axiosSecure.get("/payments-search", {
        params: {
          page: currentPage,
          limit: 10,
          search: search,
        },
      });

      setPayments(response.data.payments);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };


  const handlePaymentsUpdate = () => {
    if(!amountRef.current.value) {
      return toast.error("Amount is required!");
    }
    toast.promise(axiosSecure.put(`/payments/${id}`, {amount: amountRef.current.value}), {
      loading: "Please wait...",
      success: () => {
        handleUpdate();
        return `Updated!`;
      },
      error: (err) => {
        return err.message;
      },
    });
  }

  const handlePaid = (status, id, amount) => {
    toast.promise(axiosSecure.put(`/payments/${id}`, {status, amount}), {
      loading: "Please wait...",
      success: () => {
        handleUpdate();
        return `Updated!`;
      },
      error: (err) => {
        return err.message;
      },
    });
  }

  return (
    <div>
      {payments ? (
        <Card>
          <CardHeader>
            <CardTitle>Payments</CardTitle>

            <CardDescription>
              <form
                onSubmit={handleSearch}
                className="grid grid-cols-3 gap-3 mt-3"
              >
               <div className="">
               <Input
                  name="month"
                  type="date"
                  placeholder="Search with ID, name, phone and email..."
                />
               </div>
               <div>
               <Select name="status">
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="*">All</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="not-collected">Not Collected</SelectItem>
                  </SelectContent>
                </Select>
               </div>
                <div>
                  <Button>
                    <Search className="mr-2 w-5 h-5" /> Search
                  </Button>
                </div>
              </form>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Separator/>
           { payments.length > 0 ? <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead>
                    <span className="">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.user.name}</TableCell>
                    <TableCell>{p.amount}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="secondary">{p.status}</Badge>
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
                          <Button onClick={() => {setId(p.id); setIsOpen(true)}}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>

                          <Button onClick = {() => handlePaid(p.status == "paid" ? "pending" : "paid", p.id, p.amount)} disabled={p.status == "not-collected"}>
                            <Check className="mr-2 h-4 w-4" /> Make {p.status == "paid" ? "pending" : "paid"}
                          </Button>
                        </div>
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> : <div className="text-center mt-5 font-bold text-xl">No data found</div>}
          </CardContent>
          <CardFooter>
           { payments.length > 0 && <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            /> }
          </CardFooter>
        </Card>
      ) : (
        <Loading />
      )}

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed  inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg rounded-md shadow-2xl space-y-4 border bg-white p-8 dark:bg-gray-900 min-w-[500px]">
            <DialogTitle className="font-bold">Edit Payments</DialogTitle>
            <Description>
             
            </Description>
            <Input type="number" placeholder="Amount" ref={amountRef} />

            <div className="flex gap-4">
              <Button variant="destructive" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handlePaymentsUpdate}>
                Confirm
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default PaymentsSearchTable;
