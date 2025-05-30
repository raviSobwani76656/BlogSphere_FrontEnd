
import "../App.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./forms.css";
import axios from "axios";
import { setAuthToken, setUser } from "./auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useContext } from "react";
import { AuthContext } from "./context/context";
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SigninForm() {
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();


    const notify = () => toast.success("Sign In SuccessFull")

    const [showPopUp, setshowPopUp] = useState(false);

    const schema = yup.object().shape({
        emailAddress: yup.string().email().required("Email Address is Required"),
        password: yup.string().required("Password is Required").min(4).max(23),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data) => {
        console.log("Sign IN is successFull", data);

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                emailAddress: data.emailAddress,
                password: data.password,
            });

            const result = response.data;
            console.log(result, "result");

            setAuthToken(result.accessToken);
            setUser(result.user);


            setIsLoggedIn(true);

            console.log("Login successful");

            setshowPopUp(true);

            toast.success("Sign In Successful!");


        } catch (error) {
            console.log(error)
            const message =
                error.response?.data?.message || "Login failed. Try again.";
            alert(message);
        }
    };

    useEffect(() => {

        if (showPopUp) {

            setTimeout(() => {
                navigate('/blogs', { state: { showToast: true } });

            }, 3000);


        }



    }, [showPopUp])


    return (
        <div style={{ marginBottom: "300px", marginTop: "250px" }}>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email </label>
                    <input
                        type="text"
                        placeholder="Enter your Email"
                        {...register("emailAddress")}
                    />
                    <p>{errors.emailAddress?.message}</p>
                </div>
                <div>
                    <label>Password </label>
                    <input
                        type="password"
                        placeholder="Enter your Password"
                        {...register("password")}
                    />
                    <p>{errors.password?.message}</p>
                </div>

                <div>
                    <button className="SigninButton" type="submit"   >
                        Sign In

                    </button>

                </div>

            </form >
            <ToastContainer />
        </div >
    );
}

export default SigninForm;
