import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";
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
import { Edit, Eye, MoreHorizontal, Search, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Pagination from "./Pagination";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Description, Dialog, DialogPanel, DialogTitle,  } from '@headlessui/react'
import toast from "react-hot-toast";


const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false)
  const [id, setId] = useState(null)
  
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get("/users-with-search", {
          params: {
            page: currentPage,
            limit: 10,
            search: search,
          },
        });

        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [currentPage, search, axiosSecure]);

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(e.target.search.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  const handleUpdate = async () => {
    try {
      const response = await axiosSecure.get("/users-with-search", {
        params: {
          page: currentPage,
          limit: 10,
          search: search,
        },
      });

      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = () => {
    setIsOpen(false)
    toast.promise(
        axiosSecure.delete(`/users/${id}`),
        {
            loading: 'Please wait...',
            success: () => {
                handleUpdate()
                return `Deleted!`
            },
            error: (err) => {
                return err.message
            }
        })
  }

  return (
    <div>
      {users && user ? (
        <Card>
            <CardHeader>
              <CardTitle>All users</CardTitle>
              
              <CardDescription>
               Manage all users.
               <form onSubmit={handleSearch} className="float-right flex gap-2">
                    <Input name="search" type="text" placeholder="Search with ID, name, phone and email..."/>
                    <Button><Search className="mr-2 w-5 h-5"/> Search</Button>
              
                </form>
              </CardDescription>
            </CardHeader>
            <CardContent>
              
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">img</span>
              </TableHead>
              <TableHead>Name</TableHead>
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
                <TableCell className="hidden sm:table-cell">
                 <div>{user.id}</div>
                </TableCell>
                <TableCell className="font-medium">{user.name}   <Badge className={user.status === "active" ? "bg-green-500 text-white" : "bg-red-500 text-white"} variant="outline">{user.status}</Badge></TableCell>
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
                        <Link to={`/admin/view-user/${user.id}`}><DropdownMenuItem>View</DropdownMenuItem></Link>
                        <Link to={`/admin/edit-user/${user.id}`}><DropdownMenuItem>Edit</DropdownMenuItem></Link>
                        <DropdownMenuItem onClick={() =>{ setIsOpen(true); setId(user.id)}}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <span className="hidden lg:block">
                    <div className="flex items-center gap-2">
                    <Link to={`/admin/view-user/${user.id}`}><Button>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button></Link>

                      <Link to={`/admin/edit-user/${user.id}`}><Button>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button></Link>

                      <Button onClick={() =>{ setIsOpen(true); setId(user.id)}} variant="destructive">
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </Button>
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
            <DialogTitle className="font-bold">Are you sure?</DialogTitle>
            <Description>This user will be deleted permanantly from the database also its payment history.</Description>
             
            <div className="flex gap-4">
              <Button variant="destructive" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDelete}>Confirm</Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default UserTable;
