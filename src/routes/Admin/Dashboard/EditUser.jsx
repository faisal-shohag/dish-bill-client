import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

//   import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useState } from "react";
import {  useForm } from "react-hook-form";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "@/components/app_components/common/Loading";
// import useAuth from "@/hooks/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditUser = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [isData, setIsData] = useState(false)
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const onSubmit = (data) => {
    data = {
      ...data,
      bill: parseInt(data.bill),
    };
    toast.promise(axiosSecure.put("/users/"+id, data), {
      loading: "Updating...",
      success: "User updated successfully!",
      error: "Something went wrong!",
    });
  };

  useEffect(() => {
    axiosSecure.get(`/users/${id}`).then((res) => {
      const user = res.data.user
      setIsData(true)
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("bill", user.bill);
      setValue("location", user.location);
      setValue("status", user.status); 
      
    });
  }, [id, axiosSecure, setValue]);

  return (
    <div>
        {
            isData ? 
        
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[600px]">
        <div className=" px-10 border-r">
          <div className="mt-3">
            <div className="">
              <h1 className="text-3xl font-bold">Edit user</h1>
              <p className="text-balance text-muted-foreground">
                Update user data from here.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-4 md:grid-cols-2 grid-cols-1 lg:grid-cols-2 mt-5"
            >
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  {...register("name")}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  {...register("email")}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Phone"
                  {...register("phone")}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Set bill</Label>
                <Input
                  id="bill"
                  name="bill"
                  type="number"
                  placeholder="Set Bill"
                  {...register("bill")}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Location"
                  {...register("location")}
                  required
                />
              </div>

              <div>
              <Label htmlFor="status">Status</Label>
               <Select onValueChange={(value) => setValue("status", value)} value={watch('status')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
               </div>

              {/* <div>
            <div className="text-sm font-semibold">Contest deadline</div>
            <DatePicker className="bg-white dark:bg-slate-950 border text-center w-full px-2 py-2 rounded-md" selected={startDate} onChange={(date) => setStartDate(date)} />
            </div> */}

              <Button type="submit" className="col-span-2">
                <Plus className="mr-2 h-5 w-5" /> Update
              </Button>
            </form>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="https://img.freepik.com/free-vector/choice-worker-concept_23-2148626348.jpg?t=st=1719422423~exp=1719426023~hmac=97ed2f69343550eafe173b6332f93d5f7481fd4fd00d081967f4f7ebd596d461&w=740"
            alt="Image"
            width="1000"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div> : <Loading/>
      }
    </div>
  );
};

export default EditUser;
