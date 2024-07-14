import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { useState } from "react";
import { logout } from "../../store/authSlice";

function LogoutBtn()
{
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const logoutHandler = () => {
        setLoader(true);
        authService.logout().then(()=>{
            dispatch(logout());
        })
        .finally(()=>{
            setLoader(false);
        })
    }

    return (
        <div className="logout-btn" onClick={logoutHandler}><button className="hover:bg-zinc-200 rounded-sm p-1">{loader ? "Logging out..." : "Logout"}</button></div>
    )
}

export default LogoutBtn;