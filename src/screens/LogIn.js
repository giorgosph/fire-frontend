import React from "react";

import useLogin from "../hooks/useLogin";

const LogIn = () => {
  const { loading, password, setPassword, handleSubmit } = useLogin();

  return (
   <div className="loginContainer">
    <input
      className="loginInput"
      type="password"
      placeholder="Password"
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button className="loginButton" onClick={handleSubmit} disabled={loading}>Log In</button>
   </div>
  )
};

export default LogIn;
