import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErr();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.email.trim() === "" || inputs.password.trim() === "") {
      return setErr("Veuillez remplir tous les champs");
    }
    axios
      .post("http://localhost:9000/login", inputs)
      .then((res) => {
        // C'est pour gérer l'état si l'utilisateur se trompe de mot de passe
        // Il ne stocke pas la res.data
        if (res.data.token) {
          auth.login(res.data);
          navigate("/");
        }
      })
      .catch((res) => setErr(res.data));
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={inputs.email}
          placeholder="azerty@azerty.fr"
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={inputs.password}
          placeholder="Mot de passe"
        />

        <button>Se connecter</button>

        {err && <span>{err}</span>}
      </form>
    </main>
  );
};

export default Login;
