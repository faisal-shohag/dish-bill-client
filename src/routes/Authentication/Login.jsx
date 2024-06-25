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
    <div className="my-10 section">
      <Card>
        {/* <CardContent> */}
        <div className="w-full lg:grid  lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[600px]">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email below to login to your account
                </p>
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
              {/* <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="#" className="underline">
                Sign up
              </Link>
            </div> */}
            </div>
          </div>
          {/* <div className="hidden bg-muted lg:block">
            <img
              src="https://img.freepik.com/free-photo/satellite-approaching-earth_1048-2422.jpg?t=st=1719295262~exp=1719298862~hmac=ec0ec2bea32eb1963da66cb8c802c83e2d2c625e80b7c497d29b674c5fb77939&w=740"
              alt="Image"
              
              className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div> */}
        </div>
        {/* </CardContent> */}
      </Card>
    </div>
  );
};

export default Login;
