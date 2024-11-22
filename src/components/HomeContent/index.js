import { useState, useEffect } from "react";
import styles from "@/components/HomeContent/HomeContent.module.css";
import Loading from "../Loading/Loading";
import { useRouter } from "next/router";
import axios from "axios";


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

  const handleEdit = (game) => {
    router.push({
      pathname: "/edit",
      query: { id: game._id },
    });
  };


  return (
    <>
      <div className={styles.homeContent}>
        {/* CARD LISTA DE JOGOS */}
        <div className={styles.listGamesCard}>
          {/* TITLE */}
          <div className={styles.title}>
            <h2>Lista de jogos</h2>
          </div>
          <Loading loading={loading} />
          <div className={styles.games} id={styles.games}>
            {games.map((game) => (
              <ul className={styles.listGames} key={game._id}>
                <div className={styles.gameImg}>
                  <img src="../../images/game_cd_cover.png" alt="Jogo em estoque" />
                </div>
                <div className={styles.gameInfo}>
                  <h3>Titulo: {game.title}</h3>
                  <li>{game.platform}</li>
                  <li>{game.year}</li>
                  <li>{game.price}</li>

                  {/* Inserir aqui o botão de deletar */}
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
