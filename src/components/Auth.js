import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { signup, login, googleLogin, facebookLogin, authActions } from '../store/authSlice';

const Auth = ({ type }) => {
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
  const handleClose = (e) => {
    type === "login" ? dispatch(authActions.setShowLoginModal()) : dispatch(authActions.setShowSignupModal());
  }

  return (
    <div className="bg-white max-w-xl mx-auto rounded-xl">
      <div className="border-b border-gray-400 w-full px-5 py-3 flex justify-end items-center">
        <img src="https://cdn1.iconfinder.com/data/icons/thin-ui-1/100/Noun_Project_100Icon_1px_grid_thin_ic_x-512.png" alt="button" className="h-10 cursor-pointer" onClick={handleClose}/>
      </div>
      <h2 className="text-5xl text-black font-semibold text-center py-5">{type === "login" ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col px-10 pb-10">
        <label htmlFor="username" className="text-lg text-black mb-2">Username</label>
        <input type="text" name="username" className="p-2 bg-gray-200 rounded-md mb-4" value={values.name} onChange={(e) => setValues({ name: e.target.value, password: values.password})}/>
        <label htmlFor="password" className="text-lg text-black mb-2">Password</label>
        <input type="password" name="password" className="p-2 bg-gray-200 rounded-md mb-4" value={values.password} onChange={(e) => setValues({ name: values.name, password: e.target.value})}/>
        <button className="bg-gradient-to-b from-yellow-400 to-amber-500 py-2 rounded-lg text-lg text-white font-semibold hover:opacity-70" type="submit">
          {type === "login" ? "Login" : "Signup"}
        </button>
        <div className="flex items-center w-full my-5">
          <div className="border-b border-gray-400 w-full"/>
          <div className="px-3 font-semibold">OR</div>
          <div className="border-b border-gray-400 w-full"/>
        </div>
        <button className="flex items-center justify-center border-2 border-gray-600 py-2 rounded-lg text-lg text-gray-600 font-semibold hover:opacity-70 mb-5" type="button" onClick={handleGoogleSignIn}>
          <img src="https://imagensemoldes.com.br/wp-content/uploads/2020/04/imagem-google-logo-com-fundo-transparente-1.png" alt="Google Logo" className="h-9 pr-2"/>
          Continue with Google
        </button>
        <button className="flex items-center justify-center bg-blue-800 py-2 rounded-lg text-lg text-white font-semibold hover:opacity-70" type="button" onClick={handleFacebookSignIn}>
          <img src="https://www.pngkey.com/png/full/153-1536567_facebook-twitter-pinterest-facebook-logo-png-white.png" alt="Facebook Logo" className="h-10 pr-2"/>
          Continue with Facebook
        </button>
      </form>
    </div>
  );
};

export default Auth;
