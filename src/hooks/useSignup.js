import { useState } from "react";
// import { useAuthContext } from "./useAuthContext";
import { useAuthStore } from "../store/useAuthStore";
import { API_URL } from "../context/WorkoutContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const { dispatch } = useAuthContext();
  const login = useAuthStore((state) => state.login);

  // const signup = async (email, password) => {
  //   setIsLoading(true);
  //   setError(null);

  //   const response = await fetch(API_URL + "user/signup", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   const json = await response.json();

  //   if (!response.ok) {
  //     setIsLoading(false);
  //     setError(json.error);
  //   } else {
  //     //save the user to local storage
  //     localStorage.setItem("user", JSON.stringify(json));
  //     // update the auth context
  //     dispatch({ type: "LOGIN", payload: json });

  //     setIsLoading(false);
  //   }
  // };

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL + "user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();
      console.log("signup json", json);
      if (!response.ok) {
        setError(json.error || "Signup failed");
        setIsLoading(false);
      } else {
        console.log("signup json", json);
        login(email, password); // Zustand 裡的 login，會處理 localStorage
        setIsLoading(false);
      }
    } catch (err) {
      setError("Something went wrong");
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
