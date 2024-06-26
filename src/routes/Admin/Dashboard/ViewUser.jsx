import { useState } from 'react';
import DashboardCard from "@/components/app_components/dashboard/DashboardCard";

import { Card, CardContent } from "@/components/ui/card";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Banknote, Calendar, Edit } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from '@/components/app_components/common/Loading';
import UserTransactions from '@/components/app_components/dashboard/UserTransactions';
import { Separator } from '@/components/ui/separator';
import { dateFormate } from '@/lib/common';
import { Badge } from '@/components/ui/badge';

const ViewUser = () => {
    const {id} = useParams()
    const axiosSecure = useAxiosSecure()
    const [user, setUser] = useState(null)


    useEffect(() => {
        axiosSecure.get(`/users/${id}`).then((res) => {
          setUser(res.data.user)
          
        });
      }, [id, axiosSecure]);

  return (
    <div>
      { user ? <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <DashboardCard title="Total Paid" icon={<Banknote/>} num={user.totalPayments} />
            <DashboardCard title="Month Active" icon={<Calendar/>} num={user.payments?.length} />
          </div>
          <div className='lg:hidden md:hidden block'> <Card>
            <CardContent>
                <div className='p-5'>
                  <Link to={"/admin/edit-user/" + id}><div className='float-right p-3 flex justify-center items-center border rounded-full hover:bg-gray-700'><Edit/></div></Link>
                    <div className='flex justify-center flex-col items-center'>
                        <img className='h-[100px] rounded-full border' src='https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg' alt='profile-image'/>
                        <div className='text-2xl font-bold mt-3'>{user.name}</div>
                        <Badge className={user.status === "active" ? "bg-green-500 text-white": "bg-red-500 text-white"}>{user.status === "active" ? "Active" : "Inactive"}</Badge>
                    </div>

                    <div>
                        <div className='flex mb-2 justify-between items-center'>
                            <div>Phone</div>
                            <div>{user.phone}</div>
                        </div>
                        <Separator/>
                        <div className='flex mb-2 mt-2 justify-between items-center'>
                            <div>Location</div>
                            <div>{user.location}</div>
                        </div>
                        <Separator/>
                        <div className='flex mb-2 mt-2 justify-between items-center'>
                            <div>Bill</div>
                            <div>{user.bill} tk</div>
                        </div>
                        <Separator/>
                        <div className='flex mb-2 mt-2 justify-between items-center'>
                            <div>Email</div>
                            <div>{user.email ? user.email: "N/A"}</div>
                        </div>
                        <Separator/>

                        <div className='flex mb-2 mt-2 justify-between items-center'>
                            <div>Created</div>
                            <div>{dateFormate(user.created_at)}</div>
                        </div>
                        <Separator/>
                    </div>
                </div>
                
            </CardContent>
        </Card></div>
          <UserTransactions id={id} />
        </div>

       <div className='lg:block md:block hidden'> <Card>
            <CardContent>
                <div className='p-5'>
                  <Link to={"/admin/edit-user/" + id}><div className='float-right p-3 flex justify-center items-center border rounded-full hover:bg-gray-700'><Edit/></div></Link>
                    <div className='flex justify-center flex-col items-center'>
                        <img className='h-[100px] rounded-full border' src='https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg' alt='profile-image'/>
                        <div className='text-2xl font-bold mt-3'>{user.name}</div>
                        <Badge className={user.status === "active" ? "bg-green-500 text-white": "bg-red-500 text-white"}>{user.status === "active" ? "Active" : "Inactive"}</Badge>
                    </div>

                    <div>
                        <div className='flex mb-2 justify-between items-center'>
                            <div>Phone</div>
                            <div>{user.phone}</div>
                        </div>
                        <Separator/>
                        <div className='flex mb-2 mt-2 justify-between items-center'>
                            <div>Location</div>
                            <div>{user.location}</div>
                        </div>
                        <Separator/>
                        <div className='flex mb-2 mt-2 justify-between items-center'>
                            <div>Bill</div>
                            <div>{user.bill} tk</div>
                        </div>
                        <Separator/>
                        <div className='flex mb-2 mt-2 justify-between items-center'>
                            <div>Email</div>
                            <div>{user.email ? user.email: "N/A"}</div>
                        </div>
                        <Separator/>

                        <div className='flex mb-2 mt-2 justify-between items-center'>
                            <div>Created</div>
                            <div>{dateFormate(user.created_at)}</div>
                        </div>
                        <Separator/>
                    </div>
                </div>
                
            </CardContent>
        </Card></div>
      </div> : <Loading/>}
    </div>
  );
};

export default ViewUser;
