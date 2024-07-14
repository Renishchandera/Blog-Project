import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { Logo, Button, Input } from "./index";
import { useNavigate, Link } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import authService from "../appwrite/auth";

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();


    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData)
                    dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div>
                <Logo />
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black-60">
                Don&apos;t have any account?&nbsp;
                <Link to="/signup"
                    className="font-medium text-primary transition-all duration-200
                    hover:underline">
                    Sign Up
                </Link>
            </p>
            {
                error && <p className="text-red-600 p-2 m-3 mt-5 text-center">
                    {error}
                </p>
            }
            <div className="flex flex-col items-center justify-center">
                <form onSubmit={handleSubmit(login)}>
                    <Input
                        label="Email :"
                        type="email"
                        placeholder="Enter Email"
                        {
                            ...register("email", {
                                required: true,
                                validate: {
                                    isEmail: (value) => {
                                        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                                        return emailRegex.test(value) || "Email Must Be Valid !";
                                      }
                                }
                            })
                        }
                    />
                    <Input 
                        label="password :"
                        type="password"
                        placeholder="Enter Password"
                        {
                            ...register("password", {
                                required: true,
                                minLength: 5,
                            })
                        }
                    />
                    <Button
                        type="submit"
                        className="w-full mt-5"

                    >Sign In</Button>

                    
                </form>
            </div>
        </div>
    )
}



export default Login;