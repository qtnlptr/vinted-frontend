import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = ({ isLoggedIn }) => {
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState();
  const [color, setColor] = useState("");
  // const [cloudinaryPicture, setCloudinaryPicture] = useState(null);
  const token = Cookies.get("token");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // setCloudinaryPicture(response.data.secure_url);
      // console.log("Navigating to: ", `/offers/${response.data._id}`);
      navigate(`/offers/${response.data._id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(token);
  return !isLoggedIn ? (
    <Navigate to={"/login"} />
  ) : (
    <section className="publish-form">
      <h1>Vends ton article</h1>
      <form className="publish" onSubmit={handleSubmit}>
        <div className="picture-section">
          <label htmlFor="picture">
            <div>
              {picture ? <p>Modifier la photo</p> : <p>+ Ajouter une photo</p>}
            </div>
          </label>
          <input
            id="picture"
            style={{ display: "none" }}
            type="file"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          />
          {picture && (
            <img
              className="preview"
              src={URL.createObjectURL(picture)}
              alt=""
            />
          )}
        </div>
        <div>
          <label htmlFor="title">Titre</label>
          <input
            placeholder="ex: Tee-shirt H&M "
            id="title"
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <label htmlFor="description">Décris ton article</label>
          <textarea
            placeholder="ex: Porté quelques fois, taille correctement"
            rows={3}
            id="descritpion"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="brand">Marque</label>
          <input
            placeholder="ex: Nike"
            id="brand"
            type="text"
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />
          <label htmlFor="size">Taille</label>
          <input
            placeholder="ex: L / 40 / 12"
            id="size"
            type="text"
            value={size}
            onChange={(event) => {
              setSize(event.target.value);
            }}
          />
          <label htmlFor="color">Color</label>
          <input
            placeholder="ex: Rouge "
            id="color"
            type="text"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
          <label htmlFor="condition">État</label>
          <input
            placeholder="ex: Neuf avec étiquette"
            id="condition"
            type="text"
            value={condition}
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
          <label htmlFor="city">Lieu</label>
          <input
            placeholder="Paris"
            id="city"
            type="text"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </div>
        <div>
          <label className="price-label" htmlFor="price">
            Prix <span>(en euros)</span>
          </label>
          <input
            placeholder="0,00 €"
            id="price"
            type="number"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </div>
        <button className="publish-cta">Ajouter</button>
      </form>
    </section>
  );
};

export default Publish;
