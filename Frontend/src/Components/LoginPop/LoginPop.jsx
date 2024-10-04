import React, { useContext, useState } from "react";
import "./LoginPop.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios"
const LoginPop = ({ setShowLogin }) => {
const {url,setToken}=useContext(StoreContext)

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  })

 const onhangeHandler=(e)=>{
  const name=e.target.name
  const value = e.target.value
  setData(data=>({...data,[name]:value}))
}

const onLogin =async (e)=>{
e.preventDefault();
let newUrl =url
if(currState==="Login"){
  newUrl+="/api/user/login"
}else{
  newUrl+="/api/user/register"
}

const response =await axios.post(newUrl,data)
if(response.data.success){
  setToken(response.data.token)
  // localStorage.setItem("token",response.data.token)
  setShowLogin(false)
}else{
  alert(response.data.massage)
}
}

  return (
    <div className="login-pop">
      <form onSubmit={onLogin} className="login-pop-container">
        <div className="login-pop-title">
          <h2>{currState} </h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-pop-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input name="name" onChange={onhangeHandler} value={data.name} type="text" placeholder="Your name" required />
          )}

          <input type="email" name="email" onChange={onhangeHandler} value={data.email} placeholder="Your email" required />
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            value={data.password}
            onChange={onhangeHandler}
            id=""
          />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"} </button>
        <div className="login-pop-condtion">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account? <span onClick={() =>setCurrState("Sing Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have a account? <span onClick={() =>setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPop;
