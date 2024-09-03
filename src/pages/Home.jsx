import hero from "../assets/img/herobanner.jpg";
import icon from "../assets/img/iconvinted.png";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Home = ({ filter, priceMin, priceMax, search }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const sortOrder = filter ? "price-desc" : "price-asc";
        let url = `https://lereacteur-vinted-api.herokuapp.com/v2/offers?sort=${sortOrder}`;
        if (priceMin) url += `&priceMin=${priceMin}`;
        if (priceMax) url += `&priceMax=${priceMax}`;
        if (search) url += `&title=${search}`;

        const response = await axios.get(url);
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        // console.log(response.data);
        console.log(filter);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [filter, priceMin, priceMax, search]);

  return isLoading ? (
    <div className="loading">
      <img src={icon} alt="icon" />
      <p>Chargement ...</p>
    </div>
  ) : (
    <main>
      <div className="hero">
        <div className="container">
          <div className="hero-white-block">
            <h2>Prêt à faire du tri dans vos placards ?</h2>
            <button className="start-selling">Commencer à vendre</button>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Les dernières offres</h2>
        <section className="offers">
          {data.offers.map((item) => {
            return (
              <Link to={`/offers/${item._id}`}>
                {" "}
                <div className="card" key={item._id}>
                  <div className="owner-infos">
                    {item.owner.account.avatar ? (
                      <img
                        src={item.owner.account.avatar.secure_url}
                        alt="avatar"
                      />
                    ) : (
                      <div className="avatar-placeholder">V</div>
                    )}
                    <p>{item.owner.account.username}</p>{" "}
                  </div>
                  <div className="picture">
                    <img src={item.product_image.secure_url} alt="product" />
                  </div>
                  <div className="item-infos">
                    <p>{item.product_price} €</p>
                    {item.product_details.map((details) => {
                      return (
                        <div>
                          <p className="size"> {details.TAILLE} </p>
                          <p className="brand">{details.MARQUE}</p>
                        </div>
                      );
                    })}
                    <p></p>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default Home;
