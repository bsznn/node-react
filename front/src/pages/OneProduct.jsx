import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OneProduct = () => {
  const [product, setProduct] = useState();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);

  return (
    <main>
      {product && (
        <>
          <h1>{product.name}</h1>
          <p>{product.category}</p>
          <p>{product.price.toFixed(2)} €</p>
          <p>{product.quantity}</p>
          <p>{product.color}</p>
          {product.image && (
            <img
              style={{ width: "200px" }}
              src={`http://localhost:9000/assets/img/${product.image.src}`}
              alt={product.image.alt}
            />
          )}
        </>
      )}
    </main>
  );
};

export default OneProduct;
