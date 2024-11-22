import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const EditGame = ({ id }) => {
  const router = useRouter();
  const [game, setGame] = useState(null);
  const [formValues, setFormValues] = useState({
    id: "",
    title: "",
    platform: "",
    year: "",
    price: "",
  });

  useEffect(() => {
    const fetchGame = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:4000/game/${id}`);
          const selectedGame = response.data.game;
          setGame(selectedGame);
          setFormValues({
            id: selectedGame._id,
            title: selectedGame.title,
            platform: selectedGame.platform,
            year: selectedGame.year,
            price: selectedGame.price,
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchGame();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, title, platform, year, price } = formValues;

    const updatedGame = {
      title,
      platform,
      year,
      price,
    };

    try {
      const response = await axios.put(
        `http://localhost:4000/game/${id}`,
        updatedGame
      );
      if (response.status === 200) {
        alert("Jogo atualizado!");
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!game) {
    return <div>Carregando dados do jogo...</div>;
  }

  return (
    <>
      <h2>Editar jogo</h2>
      <form id="editForm" onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="id"
          value={formValues.id}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="title"
          placeholder="Insira o novo título"
          className="inputPrimary"
          value={formValues.title}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="platform"
          placeholder="Insira a nova plataforma do jogo"
          className="inputPrimary"
          value={formValues.platform}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="number"
          name="year"
          placeholder="Insira o novo ano"
          className="inputPrimary"
          value={formValues.year}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="price"
          placeholder="Insira o novo preço"
          className="inputPrimary"
          value={formValues.price}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input type="submit" value="Alterar" className="btnPrimary" />
      </form>
    </>
  );
};

export default EditGame;
