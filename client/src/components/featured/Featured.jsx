import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate(`/gigs?search=${search}`);
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <i>freelance</i> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./images/search.png" alt="" />
              <input
                type="text"
                placeholder="Build Mobile app"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Web Desgin</button>
            <button>Wordpress</button>
            <button>Logo Design</button>
            <button>AI services</button>
          </div>
        </div>
        <div className="right">
          <img src="./images/man.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
