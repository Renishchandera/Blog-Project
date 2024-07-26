import { useState  } from "react";
import authService from "../appwrite/auth";
import { useNavigate , Link} from "react-router-dom";
import { login } from "../store/authSlice";
import {Button, Input, Logo} from './index';
import { useDispatch } from "react-redux";
import {useForm} from 'react-hook-form';


function Signup()
{

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const [loader, setLoader] = useState(false);
    const create = async (data) => {
        setError("")
        setLoader(true);
        try {
            const userData = await authService.createAccount(data)
            .finally(()=>{
                setLoader(false);
            })
            if(userData)
            {
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(login(userData))
                    navigate('/login');
                    alert("You account has created! Login Now");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
          <div className="max-w-md w-full mx-auto p-4 bg-white rounded shadow-md">
            <div className="flex justify-center mb-4">
              <Logo className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-4">Create an account</h2>
            <p className="text-gray-600 text-center mb-4">
              Already have an account?&nbsp;
              <Link to="/login" className="text-blue-600 hover:text-blue-800 transition duration-200">
                Log In
              </Link>
            </p>
            {error && (
              <p className="text-red-600 text-center mb-4 p-2 rounded bg-red-100">
                {error}
              </p>
            )}
            <form onSubmit={handleSubmit(create)} className="flex flex-col">
              <Input
                label="Full Name:"
                type="text"
                placeholder="Enter Your Full Name"
                {...register("name", {
                  required: "Name is required",
                })}
                className="mb-4"
              />
              <Input
                label="Email:"
                type="email"
                placeholder="Enter Email"
                {...register("email", {
                  required: true,
                  validate: {
                    isEmail: (value) => {
                      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                      return emailRegex.test(value) || "Email Must Be Valid!";
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
                {loader? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
          </div>
        </div>
      );
    }

    export default Signup;