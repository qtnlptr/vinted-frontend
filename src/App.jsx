import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import "./Offer.css";
import "./Signup.css";
import "./Login.css";
import "./Publish.css";
import "./Payment.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("token") ? true : false
  );
  const [filter, setFilter] = useState(false);
  const [priceMax, setPriceMax] = useState();
  const [priceMin, setPriceMin] = useState();
  const [search, setSearch] = useState("");

  return (
    <>
      {/* {console.log(data)}; */}
      <Router>
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          filter={filter}
          setFilter={setFilter}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          priceMin={priceMin}
          setPriceMin={setPriceMin}
          search={search}
          setSearch={setSearch}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                filter={filter}
                priceMax={priceMax}
                priceMin={priceMin}
                search={search}
              />
            }
          />
          <Route path="/offers/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={
              <Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/login"
            element={
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/publish"
            element={<Publish isLoggedIn={isLoggedIn} />}
          />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
