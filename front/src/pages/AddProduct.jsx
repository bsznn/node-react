import axios from "axios";
import React, { useState } from "react";
import { token } from "../context/token";

const AddProduct = () => {
  const [inputs, setInputs] = useState({
    name: "",
    category: "",
    price: 0,
    quantity: 0,
    color: "",
    image: null,
  });

  const [err, setErr] = useState();
  const [msg, setMsg] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setInputs({ ...inputs, image: files[0] });
    } else {
      setInputs({ ...inputs, [name]: value });
      setErr("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputs.name.trim() === "" ||
      inputs.category.trim() === "" ||
      inputs.price <= 0 ||
      inputs.quantity <= 0 ||
      inputs.color.trim() === ""
    ) {
      return setErr("Veuillez remplir tous les champs");
    }

    const formData = new FormData();

    formData.append("name", inputs.name);
    formData.append("category", inputs.category);
    formData.append("price", inputs.price);
    formData.append("quantity", inputs.quantity);
    formData.append("color", inputs.color);
    formData.append("image", inputs.image);

    axios
      .post("http://localhost:9000/products/new", formData, {
        headers: token(),
      })
      .then((res) => {
        console.log(res.data);
        setInputs({
          ...inputs,
          name: "",
          category: "",
          price: "",
          quantity: "",
          color: "",
          image: null,
        });
        return setMsg("Votre produit a été ajouté avec succès");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="name" />
        <input
          onChange={handleChange}
          value={inputs.name}
          type="text"
          id="name"
          name="name"
          placeholder="Nom"
        />
        <label htmlFor="category" />
        <input
          onChange={handleChange}
          value={inputs.category}
          type="text"
          id="category"
          name="category"
          placeholder="Catégorie"
        />
        <label htmlFor="price" />
        <input
          onChange={handleChange}
          value={inputs.price}
          type="number"
          id="price"
          name="price"
          placeholder="Prix"
        />
        <input
          onChange={handleChange}
          value={inputs.quantity}
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Quantité"
        />
        <input
          onChange={handleChange}
          value={inputs.color}
          type="text"
          id="color"
          name="color"
          placeholder="Couleur"
        />

        <label htmlFor="image" />
        <input onChange={handleChange} type="file" id="image" name="image" />
        <button>Envoyer</button>
      </form>
      {err && <span>{err}</span>}
      {msg && <span>{msg}</span>}
    </main>
  );
};

export default AddProduct;
