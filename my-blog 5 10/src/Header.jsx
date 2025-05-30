
import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import AuthProvider from "./Components/context/context-provider";
import { useContext } from "react";
import { AuthContext } from "./Components/context/context";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// import SearchBar from "./Components/SearchBar/SearchBar";

import Logout from "./logout-button";
// import BlogList from "./Components/SearchBar/SearchBar";


function Header() {

    const isAuthenticated = !!localStorage.getItem("token");
    console.log(isAuthenticated);


    const { isLoggedIn } = useContext(AuthContext);


    const navigate = useNavigate();


    const handleNavigate = () => {

        navigate('/')

    }

    return (

        < header className="HeaderAndNavBar" >
            <h1 className="Header" onClick={handleNavigate}>BlogSphere</h1>

            <nav>
                <ul>
                    <li><Link to="/contactAndHelp" className="Nav-item">Contact And Help</Link></li>
                    <li><Link to="/aboutUs" className="Nav-item">About Us</Link></li>

                    {isAuthenticated && (
                        <li><Link to="/createpost/null" className="Nav-item">Create Blog</Link></li>
                    )}

                    {!isLoggedIn ? (
                        <>
                            <li><Link to="/signin" className="Nav-item">Sign In</Link></li>
                            <li><Link to="/signup" className="Nav-item">Sign Up</Link></li>
                        </>
                    ) : (
                        <li><Logout /></li>
                    )}

                    <li><Link to="/trend/trending" className="Nav-item">Trending Blogs</Link></li>
                </ul>
            </nav>


        </header >

    );
}

export default Header;
