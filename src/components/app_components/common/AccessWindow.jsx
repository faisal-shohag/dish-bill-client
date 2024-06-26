import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const AccessWindow = ({type, role}) => {
    return (
        <div className="flex flex-col items-center justify-center h-svh">
           <img className="h-[100px] w-[100px] animate-pulse" src="https://i.postimg.cc/dV1YsWV2/image.png"/>
            <div className="font-bold text-2xl mt-2">Dish Bill Management System</div>
            {type}
            <Link to={`/${role}/dashboard`}><Button className="mt-4 btn btn-xs"><ChevronLeft/> Go Back</Button></Link>
        </div>
    );
};

AccessWindow.propTypes = {
    type: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
}

export default AccessWindow;