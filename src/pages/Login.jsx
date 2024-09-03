import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const data = {
    email: email,
    password: password,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const serverResponse = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        data
      );
      if (serverResponse.data.token) {
        const token = serverResponse.data.token;
        Cookies.set("token", token, { expires: 180 });
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <main>
      <div className="container">
        <h2 className="login-title">Se connecter</h2>
        <form className="signup-login" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
            required={true}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
            required={true}
          />
          <button>Se connecter</button>
        </form>
        <Link to="/signup">
          <p className="go-sign-up">Tu n'as pas de compte ? Inscris-toi !</p>
        </Link>
      </div>
    </main>
  );
};

export default Login;
