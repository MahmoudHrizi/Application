import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../JS/actions/authaction";
import { Redirect } from "react-router-dom";
import "./AuthFrom.css";

const Login = ({ history }) => {
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const user = useSelector((state) => state.authReducer.user);
  useEffect(() => {
    if (isAuth) {
      history.push("/")
    }
  }, [isAuth]);
  

  const dispatch = useDispatch();
  const [formData, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
   if(formData.email==="mahmoud@gmail.com"){
    history.push("/dashboard")
   }else{
    history.push("/");
   }
  };

  
  return (
    <React.Fragment>
      <div className="login-session">
        <div className="contact_container">
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="input_text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="password"
              className="input_text"
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br />
            <input type="submit" value="Login" className="btn" />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;