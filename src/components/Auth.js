import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { signup, login, googleLogin, facebookLogin } from '../store/authSlice';

const Auth = ({ type = "signup" | "login"}) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({name:'', password:''});
  const [errors, setErrors] = useState({});
  const validate = () => {
    setErrors({});
    if(values.name.trim() === ''){
      setErrors({ name: 'The name field is required!' });
    }
    else if(values.password.trim() === ''){
      setErrors({ password: 'The password field is required!' });
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    if(Object.keys(errors).length === 0){
      type === "login" ? dispatch(login(values)) : dispatch(signup(values));
    }
  }
  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    dispatch(googleLogin());
  }
  const handleFacebookSignIn = (e) => {
    e.preventDefault();
    dispatch(facebookLogin());
  }

  return (
    <div className="bg-violet-600 max-w-xl mx-auto mt-20 rounded-lg p-10">
      <h1 className="text-white text-5xl text-center pb-5">{type === "login" ? "Login" : "Signup"}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" value={values.name} onChange={(e) => setValues({ name: e.target.value, password: values.password})}/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={values.password} onChange={(e) => setValues({ name: values.name, password: e.target.value})}/>
        <button className="bg-white text-lg text-violet-600 font-semibold" type="submit">
          {type === "login" ? "Login" : "Signup"}
        </button>
        <div>

        </div>
        <button className="border border-white text-lg text-white font-semibold" type="button" onClick={handleGoogleSignIn}>
          Continue with Google
        </button>
        <button className="border border-white text-lg text-white font-semibold" type="button" onClick={handleFacebookSignIn}>
          Continue with Facebook
        </button>
      </form>
    </div>
  );
};

export default Auth;
