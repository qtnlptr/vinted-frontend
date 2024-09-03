import { Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { MdAddPhotoAlternate } from "react-icons/md";

const Signup = ({ setIsLoggedIn, isLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("newsletter", newsletter);

      const serverResponse = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //   console.log(serverResponse.data);
      if (serverResponse.data.token) {
        console.log(serverResponse.data.token);
        const token = serverResponse.data.token;
        Cookies.set("token", token, { expires: 180 });
        setIsLoggedIn(!isLoggedIn);
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <main>
        <div className="container">
          <h2 className="signup-title">S'inscrire</h2>
          <form className="signup-login" onSubmit={handleSubmit}>
            <label htmlFor="picture">
              {!avatar && (
                <div className="add-avatar">
                  <MdAddPhotoAlternate />
                </div>
              )}
            </label>
            <input
              type="file"
              style={{ display: "none" }}
              id="picture"
              onChange={(event) => {
                setAvatar(event.target.files[0]);
              }}
            />
            {avatar && (
              <img
                className="preview-avatar"
                src={URL.createObjectURL(avatar)}
                alt=""
              />
            )}
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
              required={true}
            />
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
            <div className="nl">
              <div className="check-box">
                <input
                  type="checkbox"
                  onChange={(event) => {
                    setNewsletter(event.target.value);
                  }}
                  value={newsletter}
                />
                <p>S'inscrire à notre newsletter</p>
              </div>
              <p className="nl-infos">
                En m'inscrivant je confirme avoir lu et accepté les Termes &
                Conditions et Politique de Confidentialité de Vinted. Je
                confirme avoir au moins 18 ans.
              </p>
            </div>
            <button>S'inscrire</button>
          </form>
          <Link to="/login">
            <p className="go-login">Tu as un compte ? Connecte-toi !</p>
          </Link>
        </div>
      </main>
    </>
  );
};
export default Signup;
