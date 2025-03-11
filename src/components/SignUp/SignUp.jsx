import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import "./SignUp.css";
import Navbar from "../Navbar/Navbar";
import {Navigate, useNavigate} from "react-router-dom"

function SignUp() {
  const Userdata = {
    name: "",
    password: "",
    email: "",
  };
  const [data, setData] = useState(Userdata);

  const navigation = useNavigate()

  const handleInput = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    const name = event.target.name;
    const value = event.target.value;

    setData({ ...data, [name]: value });
  };

  console.log(data);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.name =="" || data.password == "" || data.email=="") {
      alert("Fill All The Fields")
    }

    else{
      const getdata = JSON.parse(localStorage.getItem("user") || "[]");
  
      let arr = [];
      arr = [...getdata];
      arr.push(data);
  
      localStorage.setItem("user", JSON.stringify(arr));

      alert("SignUp Successfully")

      navigation("/login")

    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="heading">SignUp Here</h1>
        <CgProfile />
        <form onSubmit={handleSubmit}>
          <div className="feilds">
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              onChange={handleInput}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInput}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInput}
            />
            <p>
              Already have an account <a href="">Login</a>
            </p>
          </div>
          <button>SignUp</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
