import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Card from "../components/Card";

export const Home = ({ searchKey }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/api/products?q=" + searchKey)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [searchKey]);

  return (
    <section id="home">
      <div className="home-container">
        <h1>
          <FormattedMessage id = "gallery"/>
        </h1>
        <div className="home-card">
          {products.map((item, index) => {
            return(
              <div className = {item.isActive === 'true'? 'card' : 'card inactive'}>
              <Card name = {item.name} picture = {item.picture} price = {item.price} isActive = {item.isActive}></Card>
              </div>
            )            
          })}
        </div>
      </div>
    </section>
  );
};
