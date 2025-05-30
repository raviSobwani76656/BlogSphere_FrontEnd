// import React from "react";
// import Header from "./Header";
// import SignupForm from "./Components/SignupForm";
// import Home from "./Home";
// import SigninForm from "./Components/SigninForm";
// import PostcreatorForm from "./Components/PostcreatorForm";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Blog1 from "./Components/TrendingBlogs/Blog1";
// import AuthProvider from "./Components/context/context-provider";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// function App() {

//   const showToast = () => {
//     toast.success('This is a success message!');
//   };


//   return (

//     <AuthProvider>
//       <>

//         <Router>
//           <>
//             <Header />
//           </>
//           <div style={{ marginTop: "8%" }}>
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/signup" element={<SignupForm />} />
//               <Route path="/signin" element={<SigninForm />} />
//               <Route path="/createpost/:id" element={<PostcreatorForm />} />
//               <Route path="/blogs" element={<Blog1 />} />
//               <Route path="/logout" element={<logout />} />
//             </Routes>

//             <ToastContainer />
//           </div>

//         </Router >
//       </>
//     </AuthProvider >

//   );
// }

// export default App;


import React from "react";
import Header from "./Header";
import SignupForm from "./Components/SignupForm";
import Home from "./Home";
import SigninForm from "./Components/SigninForm";
import PostcreatorForm from "./Components/PostcreatorForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog1 from "./Components/TrendingBlogs/Blog1";
import AuthProvider from "./Components/context/context-provider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleBlog from "./Components/SingleBlog";
import BlogList from "./Components/SearchBar/SearchBar";
import AboutUs from "./Components/aboutUs/aboutUs";
import ContactAndHelp from "./Components/ConTacAndHelp/ConTactAndHelp";
import Footer from "./Components/Footer/Footer";



function App() {


  return (
    <AuthProvider>
      <Router>
        <Header />
        <div style={{ marginTop: "100px" }}> {/* Adjust the margin as needed */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupForm />} />

            <Route path="/signin" element={<SigninForm />} />
            <Route path="/createpost/:slug" element={<PostcreatorForm />} />
            <Route path="/blogs" element={<Blog1 mode="all" />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/trend/trending" element={<Blog1 mode="trending" />} />
            <Route path="/blog/:slug" element={<SingleBlog />} />

            <Route path="/contactAndHelp" element={<ContactAndHelp />} />
            {/* <Route path="/logout" element={<Logout />} /> */}
          </Routes>
          <ToastContainer />
        </div>
        <Footer />

      </Router>

    </AuthProvider>

  );
}

export default App;
