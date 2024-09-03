import logo from "../assets/img/vintedlogo.png";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({
  isLoggedIn,
  setIsLoggedIn,
  filter,
  setFilter,
  priceMax,
  setPriceMax,
  priceMin,
  setPriceMin,
  search,
  setSearch,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isHomePage = currentPath === "/";
  // console.log(isHomePage);

  return (
    <header>
      <div className="container">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="vinted" />
          </div>
        </Link>
        <div className="nav">
          <input
            className="search"
            type="search"
            placeholder="Chercher un article"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          {isHomePage && (
            <div className="filter-section">
              <h3>Filtres</h3>
              <div className="filters">
                <div>
                  <div>
                    <input
                      type="checkbox"
                      id="sorting"
                      onChange={(event) => {
                        setFilter(event.target.checked);
                      }}
                      checked={filter}
                    />
                    <label htmlFor="sorting">
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
                      {filter ? "Prix décroissant" : "Prix croissant"}
                    </label>
                  </div>
                </div>
                <form
                  className="price-range"
                  onSubmit={(event) => {
                    event.preventDefault();
                  }}
                >
                  {/* <label htmlFor="priceMin">Prix Min</label> */}
                  <label className="from-to" htmlFor="priceMin">
                    De
                  </label>
                  <input
                    placeholder="Prix Min"
                    className="range"
                    min="0"
                    name="priceMin"
                    type="number"
                    onChange={(event) => {
                      setPriceMin(event.target.value);
                    }}
                    value={priceMin}
                  />
                  {/* <label htmlFor="priceMax">Prix Max</label> */}
                  <label className="from-to" htmlFor="priceMin">
                    à
                  </label>
                  <input
                    placeholder="Prix Max"
                    className="range"
                    min="1"
                    name="priceMax"
                    type="number"
                    onChange={(event) => {
                      setPriceMax(event.target.value);
                    }}
                    value={priceMax}
                  />
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="header-ctas">
          <Link to="/publish">
            <button className="sell-cta">Vends tes articles</button>
          </Link>

          {Cookies.get("token") ? (
            <div>
              <button className="invisible-cta">nothing</button>
              <button
                className="signout"
                onClick={() => {
                  Cookies.remove("token");
                  setIsLoggedIn(!isLoggedIn);
                }}
              >
                Se déconnecter
              </button>
            </div>
          ) : (
            <div>
              <Link to="/signup">
                <button className="signup">S'inscrire</button>
              </Link>
              <Link to="/login">
                <button className="login">Se connecter</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
