import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [err, setErr] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:9000/products")
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((res) => {
        console.log(res);
        setErr("Impossible de charger les données");
      });
  }, []);

  return (
    <main>
      <section>
        {products.map((oneProduct, i) => (
          <>
            <article key={oneProduct._id}>
              <h2>
                <NavLink to={`/produit/${oneProduct._id}`}>
                  {oneProduct.name}
                </NavLink>
              </h2>
              <p>{oneProduct.category}</p>
              <p>{oneProduct.price.toFixed(2)}</p>
              <p>{oneProduct.quantity}</p>
              <p>{oneProduct.color}</p>
              {oneProduct.image && (
                <img
                  src={`http://localhost:9000/assets/img/${oneProduct.image.src}`}
                  alt={oneProduct.image.alt}
                  style={{ width: "200px" }}
                />
              )}

              <span>
                Produit créé le :
                {new Date(oneProduct.createdAt).toLocaleDateString()}
              </span>
            </article>
          </>
        ))}
      </section>
    </main>
  );
};

export default Products;
