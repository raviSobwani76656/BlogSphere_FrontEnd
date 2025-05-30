import "../App.css";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { setAuthToken, setUser } from "./auth";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function SignupForm() {

    const [showPopUp, setshowPopUp] = useState(false);

    const navigate = useNavigate();

    const schema = yup.object().shape({
        firstName: yup.string().required("First Name is required").min(2).max(20),
        lastName: yup.string().required("Last Name is required").min(2).max(25),
        emailAddress: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().required("Password is required").min(5).max(19),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
        aboutYourself: yup.string().max(500, "Description should be under 500 characters"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }

    } = useForm(
        { resolver: yupResolver(schema) }

    );

    const onSubmit = async (data) => {

        // console.log("User Info Submission SuccessFull", data);
        console.log(data, "data");

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                username: `${data.firstName} ${data.lastName}`,
                emailAddress: data.emailAddress,
                password: data.password,
            });
            const result = response.data;
            console.log(result, "response");

            // setAuthToken(result.token);
            // setUser(result.user);

            console.log("Signup successful");

            setshowPopUp(true);
            toast.success("Sign Up Successful!");


            setTimeout(() => {

                setshowPopUp(false);
                navigate('/signin');

            }, 3000);

        } catch (error) {
            console.log(error);

            const message =
                error.response?.data?.message || "Signup failed. Try again.";
            alert(message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label >First Name </label>
                    <input type="text" placeholder="Enter First Name" {...register("firstName")}></input>
                    <p>{errors.firstName?.message}</p> <br />
                </div>
                <div>
                    <label >last Name </label>
                    <input type="text" placeholder="Enter last Name" {...register("lastName")} ></input>
                    <p>{errors.lastName?.message}</p>
                    <br />

                </div>
                <div><label >Email Address </label>
                    <input type="email" placeholder="Enter Email Address" {...register("emailAddress")} ></input>
                    <p>{errors.emailAddress?.message}</p>

                    <br />
                </div>
                <div><label >Password </label>
                    <input type="password" placeholder="Enter Password" {...register("password")} ></input>
                    <p>{errors.password?.message}</p>
                    <br />
                </div>
                <div><label > Confirm Password </label>
                    <input type="password" placeholder="Confirm Password" {...register("confirmPassword")} ></input>
                    {errors.confirmPassword?.message}
                    <br />
                </div>

                <div> <label> Tell Us About Yourself</label><br />
                    <textarea placeholder="Tell readers about yourself....." rows={10} cols={66}{...register("aboutYourself")}></textarea>
                    {errors.aboutYourself?.message}
                    <br />
                </div>

                {showPopUp && (

                    <div>


                    </div>
                )}

                <div><button type="submit" className="SubmitButton">Sign Up</button>
                </div>

            </form>

            <ToastContainer />
        </div>
    )
}
export default SignupForm;