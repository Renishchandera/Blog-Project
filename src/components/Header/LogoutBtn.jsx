import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn()
{
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(()=>{
            dispatch(logout());
        })
    }

    return (
        <div className="logout-btn" onClick={logoutHandler}>Log Out</div>
    )
}

export default LogoutBtn;