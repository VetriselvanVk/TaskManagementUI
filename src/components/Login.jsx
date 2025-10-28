// components/Login.jsx
import React, { useEffect, useState } from "react";
import api from "../apiClient/axiosInterceptor";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("string");
  const [isLogging, setIsLogging] = useState(false);

  const nav = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      //   onLogin({ email, password });
      const handleLogin = async (data) => {
        await localStorage.setItem("token", data);
        nav('/tasks')
        //  onLogin( email);
      };
      setIsLogging(true)
      api
        .post(`auth/login?email=${email}&password=${password}`)
        // .then((res) => console.log("token",res?.data?.data?.access_token))
        .then((res) => {
          if(res?.data?.status == 1){
             handleLogin(res?.data?.data?.access_token)
             toast.success(res?.data?.message)
          }
          else{
            toast.success(res?.data?.message)
          }
        })
        .catch((err) => console.error("Error fetching users:", err))
        .finally(() => {
          setIsLogging(false)
        });
    } else {
      alert("Please enter both email and password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          border: "1px solid #ccc",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#1976d2" }}>Login</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
            }}
            required
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            disabled={isLogging}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#115293")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#1976d2")}
          >
            {isLogging ? "Please Wait..." : "Login"}
          </button>
          <div onClick={()=>nav("/signup")}>SignIn</div>
        </form>
      </div>
    </div>
  );
}
