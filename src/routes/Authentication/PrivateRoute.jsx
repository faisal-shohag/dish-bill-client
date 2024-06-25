import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'
import ProgressWindow from "@/components/app_components/common/ProgressWindow";


const PrivateRoute = ({ children }) => {
   

    const {user, loading} = useContext(AuthContext)

    const location = useLocation()
    if(loading) {
        return <ProgressWindow progressbar={<progress className="progress w-56"></progress>}/>
    }

    if(user) {
            return children;
    }


    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
}

export default PrivateRoute;