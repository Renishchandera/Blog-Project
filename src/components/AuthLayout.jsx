import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protected({ children, authentication = true }) {
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        if (authentication && !authStatus) {

            navigate("/login")

        } else if (!authentication && authStatus) {
            navigate("/")
        }else {
            setLoader(false);
        }
       
    }, [authStatus, navigate, authentication, children])
    return loader ? <h1>Loading...</h1> :  <>{children}</>
}