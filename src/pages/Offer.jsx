import { Link } from "react-router-dom";
import icon from "../assets/img/iconvinted.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
const Offer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const params = useParams();

  //   console.log(params);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${params.id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(data);

  return isLoading ? (
    <div className="loading">
      <img src={icon} alt="icon" />
    </div>
  ) : (
    <main className="container-offer">
      <div>
        <img
          src={data.product_image.secure_url}
          alt={data.product_description}
        />
      </div>
      <div className="item-details">
        <div>
          <p className="item-price">{data.product_price} €</p>

          {data.product_details.map((detail, index) => {
            const keys = Object.keys(detail);
            const key = keys[0];
            return (
              <div key={index} className="details">
                <div className="title">{key && <p>{key}:</p>}</div>
                <div className="info">
                  <p>{detail[key]}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="divider"></div>
        <div className="offer-content">
          <p className="product-name">{data.product_name}</p>
          <p className="description">{data.product_description}</p>
          <div className="owner">
            {data.owner.account.avatar ? (
              <img
                className="avatar"
                src={data.owner.account.avatar.secure_url}
                alt="avatar"
              />
            ) : (
              <div className="avatar-placeholder-offer">V</div>
            )}
            <p>{data.owner.account.username}</p>
          </div>
        </div>
        <Link
          to="/payment"
          state={{ title: data.product_name, price: data.product_price }}
        >
          <button className="order">Acheter</button>
        </Link>
      </div>
    </main>
  );
  // {data.offers.map((elem)=>{})}
};
export default Offer;

// <article className="container-offer">
// <div className="item-image"></div>
// <div className="item-details"></div>
// </article>
