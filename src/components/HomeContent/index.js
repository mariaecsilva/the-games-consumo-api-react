import { useState, useEffect } from "react";
import styles from "@/components/HomeContent/HomeContent.module.css";
import Loading from "../Loading";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import capa from "../../../public/images/game_cd_cover.png";

const HomeContent = () => {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:4000/games");
        setGames(response.data.games);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGames();
  }, []);

  const deleteGame = async (gameId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/game/${gameId}`
      );
      if (response.status === 204) {
        alert("Jogo deletado com sucesso!");
        setGames(games.filter((game) => game._id !== gameId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (game) => {
    router.push({
      pathname: "/edit",
      query: { id: game._id },
    });
  };

  return (
    <>
      <div className={styles.homeContent}>
        <div className={styles.listGamesCard}>
          <div className={styles.title}>
            <h2>Lista de jogos</h2>
          </div>
          <Loading loading={loading} />
          <div className={styles.games}>
            {games.map((game) => (
              <ul className={styles.listGames} key={game._id}>
                <div className={styles.gameImg}>
                  <Image
                    src={capa}
                    alt="Jogo em estoque"
                    width={100}
                    height={100}
                  />
                </div>
                <div className={styles.gameInfo}>
                  <h3>{game.title}</h3>
                  <li>{game.platform}</li>
                  <li>{game.year}</li>
                  <li>R${game.price}</li>
                  <button
                    className={styles.btnDel}
                    onClick={() => deleteGame(game._id)}
                  >
                    Deletar
                  </button>
                  <button
                    className={styles.btnEdit}
                    onClick={() => handleEdit(game)}
                  >
                    Editar
                  </button>
                </div>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeContent;
