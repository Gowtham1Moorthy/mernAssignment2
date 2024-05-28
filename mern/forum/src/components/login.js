
import React, { useState } from "react"
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function () {

  const [user, setuser] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  function usernameGetting(e){
    setuser(e.target.value);
  }
  
  function passwordGetting(e){
    setpassword(e.target.value);
  }

  function submit(){
    axios.post("http://localhost:5000/login", {user, password})
    .then(response => {
      if(response.data.error){
        seterror("UserName is Alrady Exist");
      }
      if(response.data.token){
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
      console.log(response.data);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  return (
    <div className="Auth-form-container">
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign in</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter UserName"
              onChange={usernameGetting}
            />
            <div>{error}</div>
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={passwordGetting}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={submit}>
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            <Link to={"/signup"} >Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}