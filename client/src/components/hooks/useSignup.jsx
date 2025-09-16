import { useState } from "react";
import { useAuthContext } from "./useAuthContext.jsx";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (name, surname, email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, surname, email, password})
        })
        let json;

  try {
    json = await response.json();
  } catch (err) {
    console.error("❌ Failed to parse JSON:", err);
    setError("Server returned invalid JSON");
    setIsLoading(false);
    return;
  }

  if (!response.ok) {
    console.error("❌ Signup failed:", json); // 👉 THIS LINE IS IMPORTANT
    setError(json?.error || "Unknown error");
    setIsLoading(false);
  }

  if (response.ok) {
    localStorage.setItem("user", JSON.stringify(json));
    dispatch({ type: "LOGIN", payload: json });
    setIsLoading(false);
  }
        // const json = await response.json()

        // if(!response.ok) {
        //     setIsLoading(false)
        //     setError(json.error)
        // }
        // if(response.ok) {
        //     localStorage.setItem('user', JSON.stringify(json))

        //     dispatch({type: 'LOGIN', payload: json})

        //     setIsLoading(false)
        // }
    }

    return { signup, isLoading, error }
}