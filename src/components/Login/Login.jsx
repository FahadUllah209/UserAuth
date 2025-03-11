import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import {Navigate, useNavigate} from "react-router-dom"

function Login() {

  const navigation = useNavigate()
  const [email ,setEmail] = useState("");
  const [password ,setPassword] = useState("");
  const [errorMsg , setErrorMsg] = useState("")

  const handleInput = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        if(name == "email"){
          setEmail(value)
        }
        if(name == "password"){
          setPassword(value)
        }
  }

  const handleSubmit = (event)=>{

    event.preventDefault()
    let getDetail = JSON.parse(localStorage.getItem("user"))
    console.log(getDetail)

    let found = false;
    getDetail.map((curValue) => {
      let storeEmail = curValue.email;
      let storePassword = curValue.password;

      if (storeEmail === email && storePassword === password) {
        alert("Login Successful");
        setErrorMsg("");
        found = true;

        navigation("/home")
      }
    });

    if (!found) {
      setErrorMsg("Email and Password are Incorrect");
    }

  }
  return (
    <>
      <Navbar />
      <p className="error-msg">{errorMsg}</p>
      <div className="container">
        <h1 className="heading">Login Here</h1>
        <CgProfile />
        <form onSubmit={handleSubmit}>
          <div className="fields">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              onChange={handleInput}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              onChange={handleInput}
            />
            <p>
              Don't have an account? <a href="#">Sign Up</a>
            </p>
          </div>
          <button>Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
