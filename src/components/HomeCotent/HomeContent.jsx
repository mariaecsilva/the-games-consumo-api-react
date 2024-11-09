import styles from '@/components/HomeCotent/HomeContent.module.css'
import Loading from '../Loading/Loading';

const HomeContent = () => {
    return (
        <div className={styles.homeContent}>
            {/* CARD DE LISTA DE JOGOS */}
            <div className={styles.listGamesCard}>
                <div className={styles.title}>
                    <h2>Lista de jogos</h2>
                </div>
                    <Loading/>
                <div className={styles.games} id="games">
                    {/* Lista de jogos irá aqui */}
                </div>
            </div>
        </div>
    );
}

export default HomeContent;