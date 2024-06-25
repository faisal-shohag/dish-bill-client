import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

//   import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
// import useAuth from "@/hooks/useAuth";

const AddUser = () => {
    // const [startDate, setStartDate] = useState(new Date());
    const { register, handleSubmit } = useForm()

    const axiosSecure = useAxiosSecure()
    // const {user} = useAuth()
    
    const onSubmit = data => {
        data = {
            ...data,
            bill: parseInt(data.bill),
        }

        toast.promise(
            axiosSecure.post('/user', data),
            {
                loading: 'Adding...',
                success: 'User added successfully!',
                error: 'Something went wrong!'
            }
        )

    }

    

    return (
        <div>
<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[600px]">
      <div className=" px-10 border-r">
        <div className="mt-3">
          <div className="">
            <h1 className="text-3xl font-bold">Add user</h1>
            <p className="text-balance text-muted-foreground">
              Add user from here.
            </p>
          </div>
  
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 grid-cols-2 mt-5">

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

           


            {/* <div>
            <div className="text-sm font-semibold">Contest deadline</div>
            <DatePicker className="bg-white dark:bg-slate-950 border text-center w-full px-2 py-2 rounded-md" selected={startDate} onChange={(date) => setStartDate(date)} />
            </div> */}

           
            <Button type="submit" className="col-span-2">
              <Plus className="mr-2 h-5 w-5"/> Add
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="https://img.freepik.com/free-vector/mural-artist-concept-illustration_114360-6335.jpg?t=st=1717762539~exp=1717766139~hmac=ce984d1697c18ff6d34b38bac08064dea9e211a5cb954803564022337335a8fb&w=740"
          alt="Image"
          width="1000"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
           
        </div>
    );
};


export default AddUser;