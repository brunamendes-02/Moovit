import { useContext } from 'react';
import { ChalangeContext } from '../contexts/ChalangeContext';
import styles from '../styles/components/ChalangeBox.module.css';

export function ChalangeBox() {
    const {activeChalange, resetChalange} = useContext(ChalangeContext)

    return (
        <div className={styles.chalangeBoxContainer}>
            {activeChalange? (
                <div className={styles.chalangeActive}>
                    <header>Ganhe {activeChalange.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChalange.type}.svg`} alt=""/>
                        <strong>Novo desafio</strong>
                        <p>{activeChalange.description}</p>
                    </main>
                    <footer>
                        <button 
                        type="button"
                        onClick={resetChalange}
                        className={styles.chalangeFailedButton}
                        >
                            Falhei
                        </button>
                        <button 
                        type="button"
                        className={styles.chalangeSucceededButton}
                        >
                            Completei
                        </button>
                    </footer>
                </div>

            ) : (
            <div className={styles.challangeNotAchieve}>
                <strong>Finalize um cliclo para receber desafios</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level up"/>
                    Avance de level completando desafios
                </p>
            </div>
            )}
        </div>
    )
}