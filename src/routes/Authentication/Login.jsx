import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        toast.promise(
            axiosSecure
          .get("/admins/" + data.email)
          .then((res) => {
            console.log(res.data);
            navigate(`/${res.data.admin.role}/dashboard`)
          })
          .catch((error) => {
            console.log(error);
          }),
          {
            loading: "Please wait...",
            success: "Logged in successfully",
            error: "Something went wrong",
          
          }
        )
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
  };

  return (
    <div className="my-5 section w-full">
      <div className="flex justify-center flex-col items-center"> <img className="h-[80px]" src="https://i.postimg.cc/dV1YsWV2/image.png" alt="logo"/>
      <div className="font-bold text-lg mt-2 text-white">Dish Bill Management System</div>
      
      </div>
      <div style={{backgroundImage: "url('https://img.freepik.com/premium-photo/cosmic-purple-space_915141-171.jpg?w=900')"}} className="absolute top-0 left-0 h-screen w-screen bg-cover bg-center z-[-1] blur-3xl"></div>
      <div className="mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[450px] gap-6 border p-10 rounded-xl bg-white dark:bg-gray-900">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    {...register("password", { required: true })}
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </div>
          </div>

      </div>
    </div>
  );
};

export default Login;
