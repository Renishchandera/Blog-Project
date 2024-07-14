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
  const [loader, setLoader] = useState(false);

  const login = async (data) => {
    setLoader(true);
    setError("")
    try {
      const session = await authService.login(data)
      .finally(()=>{
        setLoader(false);
      })
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
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-auto p-4 bg-white rounded shadow-md">
        <div className="flex justify-center mb-4">
          <Logo className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Sign in to your account</h2>
        <p className="text-gray-600 text-center mb-4">
          Don't have an account?&nbsp;
          <Link to="/signup" className="text-blue-600 hover:text-blue-800 transition duration-200">
            Sign Up
          </Link>
        </p>
        {error && (
          <p className="text-red-600 text-center mb-4 p-2 rounded bg-red-100">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(login)} className="flex flex-col">
          <Input
            label="Email:"
            type="email"
            placeholder="Enter Email"
            {...register("email", {
              required: true,
              validate: {
                isEmail: (value) => {
                  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                  return emailRegex.test(value) || "Email Must Be Valid !";
                }
              }
            })}
            className="mb-4"
          />
          <Input
            label="Password:"
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              required: true,
              minLength: 5,
            })}
            className="mb-4"
          />
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-800 text-white font-bold rounded"
          >
            {loader ? "Signing In....Please Wait" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login;