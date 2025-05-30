import "./App.css";
import { useNavigate } from "react-router-dom";


export default function Home() {

    const navigate = useNavigate();


    const handleStartReading = () => {

        navigate('/blogs')

    }

    return (

        <div style={{ padding: "20px", marginTop: "245px" }}>
            <h2 style={{ textAlign: "center", fontSize: "55px " }} >Welcome to BlogSphere</h2>

            <p> Dive into a world of ideas, stories, and expert insights designed to ignite your curiosity and fuel your creativity.</p>
            <p>Your daily dose of insights, innovation, and inspiration—crafted to spark ideas and share stories that matter.</p>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "200px" }}> <button className="GetStartedButton" onClick={handleStartReading}> Start Reading</button></div>


        </div>
    )


}


// , backgroundImage: `url("https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2655.jpg?t=st=1744350379~exp=1744353979~hmac=9178a1aaf86ae7a2c47e2b9c067ed7f8db6143247300c738c17d34c8758cda6b&w=996")`, width: "1700px", height: "3500px"