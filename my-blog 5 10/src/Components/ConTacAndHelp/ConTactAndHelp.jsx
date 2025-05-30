import React, { useState } from 'react';
import "./ContactAndHelp.css";

function ContactAndHelp() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [queryOrSuggestion, setQueryOrSuggestion] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState({
        fullName: "",
        email: "",
        queryOrSuggestion: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isFormValid = true;

        const newErrors = {
            fullName: "",
            email: "",
            queryOrSuggestion: ""
        };

        if (fullName.trim() === "") {
            newErrors.fullName = "Enter the name";
            isFormValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === "") {
            newErrors.email = "Enter the email first";
            isFormValid = false;
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Enter a valid email address";
            isFormValid = false;
        }

        if (queryOrSuggestion.trim() === "") {
            newErrors.queryOrSuggestion = "Enter the query or suggestion";
            isFormValid = false;
        } else if (queryOrSuggestion.length < 150) {
            newErrors.queryOrSuggestion = "Please enter the query in detail (min 150 characters)";
            isFormValid = false;
        }

        if (!isFormValid) {
            setError(newErrors);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fullName, email, queryOrSuggestion })
            });

            if (!response.ok) throw new Error("Failed to submit");

            setFullName("");
            setEmail("");
            setQueryOrSuggestion("");
            setError({ fullName: "", email: "", queryOrSuggestion: "" });
            setSuccessMessage("Your Query or Suggestion has been submitted.");
        } catch (error) {
            console.error(error);
            setSuccessMessage("Submission failed. Please try again.");
        }
    };

    return (
        <>
            <form style={{ display: "flex", flexDirection: "column", gap: "3px", marginBottom: "165px" }} onSubmit={handleSubmit}>
                <label htmlFor="fullName">Full Name</label>
                <input
                    id="fullName"
                    type='text'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder='Enter Your Name'
                />
                {error.fullName && <p style={{ color: "red" }}>{error.fullName}</p>}

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter Your Email'
                />
                {error.email && <p style={{ color: "red" }}>{error.email}</p>}

                <label htmlFor="query">Your Query or Suggestion</label>
                <textarea
                    id="query"
                    value={queryOrSuggestion}
                    onChange={(e) => setQueryOrSuggestion(e.target.value)}
                    placeholder='Enter your question or suggestion in detail...'
                    rows={9}
                    cols={65}
                />
                {error.queryOrSuggestion && <p style={{ color: "red" }}>{error.queryOrSuggestion}</p>}

                <button type="submit" className='submitButton'>Submit</button>
            </form>

            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </>
    );
}

export default ContactAndHelp;
