import DashboardCard from "@/components/app_components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MessagesSquare, SendHorizonal } from "lucide-react";

const SendMessage = () => {
    return (
        <div>
          <div className="grid grid-cols-3 gap-2.5">
          <form className="p-5 border rounded-xl shadow-md col-span-2">
            <div className="mb-3 flex items-center text-xl font-bold"> <MessagesSquare className="mr-2 h-5 w-5"/> Send Messages</div>

            <div className="mb-3">
                <Input type="text" name="name" placeholder="Type phone number or select user from the table" />
            </div>
            <div className="mb-3">
            <Textarea name="msg" placeholder="Type your message here" />
            </div>
            <Button className="dark:bg-gray-900 text-white"><SendHorizonal className="mr-2 h-5 w-5"/> Send</Button>
           </form>

           <div className="grid items-center">
            <DashboardCard icon={<MessagesSquare/>} title="Total sent" num={0}/>
            <DashboardCard icon={<Calendar/>} title="This month" num={0}/>
           </div>
          </div>
        </div>
    );
};

export default SendMessage;