import React, { useEffect, useState } from "react";

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
        <h1>Gallery</h1>
        <div className="home-card">
          {products.map((item, index) => {
            return(
              <div className = "card">
              <Card name = {item.name} picture = {item.picture} price = {item.price} isActive = {item.isActive}></Card>
              </div>
            )            
          })}
        </div>
      </div>
    </section>
  );
};
