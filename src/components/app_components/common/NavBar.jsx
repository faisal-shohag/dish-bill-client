import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="border mb-10">
             <NavLink to='/admin_dashboard'>Dashboard</NavLink>
        </div>
    );
};

export default NavBar;