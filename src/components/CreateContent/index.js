import styles from "@/components/CreateContent/CreateContent.module.css";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const CreateContent = () => {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title && platform && year && price !== "") {
      const game = {
        title,
        platform,
        year,
        price,
      };

      try {
        const response = await axios.post("http://localhost:4000/game", game);
        if (response.status === 201) {
          router.push("/home");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Por favor, preencha todos campos.");
    }
  };

  return (
    <>
      <div className={styles.createContent}>
        <div className="title">
          <h2>Cadastrar novo jogo</h2>
        </div>
        <form onSubmit={handleSubmit} className="formPrimary">
          <input
            type="text"
            name="title"
            placeholder="Insira o título do jogo"
            className="inputPrimary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            name="platform"
            placeholder="Insira a plataforma do jogo"
            className="inputPrimary"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />
          <input
            type="number"
            name="year"
            placeholder="Insira o ano do jogo"
            className="inputPrimary"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <input
            type="number"
            name="price"
            placeholder="Insira o preço do jogo"
            className="inputPrimary"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input type="submit" value="Cadastrar" className="btnPrimary" />
        </form>
      </div>
    </>
  );
};

export default CreateContent;
