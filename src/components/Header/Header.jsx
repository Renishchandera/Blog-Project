import { Link , useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { LogoutBtn, Logo, Container } from "../index";


function Header()
{
    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate();
    const navItems = [
        {
            name: "Home",
            path: "/",
            active: true,
        },
        {
            name: "Login",
            path: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            path: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            path: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            path: "/add-post",
            active: authStatus,
        }
    ]




    return(
        <>
            <div className="header pd-y shadow bg-gray-500">
                <Container>
                    <nav className="flex">
                        <div className="mr-4">
                            <Link to="/">
                                <Logo width="70px"/> 
                            </Link>
                        </div>
                        <ul className="flex">
                            {
                                navItems.map((item) => (
                                    <li key={item.name}>
                                        <button onClick={() => navigate(item.path)}>
                                            {item.name}
                                        </button>
                                    </li>
                                ))
                            }
                            {
                                authStatus && (
                                    <li>
                                        <LogoutBtn/>
                                    </li>
                                )
                            }
                        </ul>
                    </nav>
                </Container>
            </div>
        </>
    )
}

export default Header;