import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogoutBtn, Logo, Container } from "../index";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
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
        },
    ];

    return (
        <>
            <div className="header py-4 shadow-md bg-gray-500 w-full">
                <Container>
                    <nav className="flex justify-between items-center">
                        <div className="mr-4">
                            <Link to="/">
                                <Logo width="70px" className="w-14 h-14" />
                            </Link>
                        </div>
                        <ul className="flex flex-wrap justify-center md:flex-nowrap">
                            {navItems.map((item) => {
                                if ((item.name !== 'Signup' && item.name !== 'Login')) {
                                 return   <li key={item.name} className="mx-3 md:mx-6 lg:mx-8 shrink">
                                        <button
                                            onClick={() => navigate(item.path)}
                                            className="text-gray-200 rounded p-1 hover:text-gray-900 hover:bg-zinc-100 transition duration-300 ease-in-out"
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                } else if (!authStatus) {
                                  return  <li key={item.name} className="mx-3 md:mx-6 lg:mx-8 shrink">
                                        <button
                                            onClick={() => navigate(item.path)}
                                            className="text-gray-200 rounded p-1 hover:text-gray-900 hover:bg-zinc-100 transition duration-300 ease-in-out"
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                }
                            })}
                            {authStatus && (
                                <li className="mx-3 md:mx-6 lg:mx-8 sm-mx-2">
                                    <LogoutBtn className="text-gray-200 hover:text-gray-900 transition duration-300 ease-in-out" />
                                </li>
                            )}
                        </ul>
                    </nav>
                </Container>
            </div>
        </>
    );
}

export default Header;