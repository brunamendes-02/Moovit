import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengeContext)

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button 
                        type="button"
                        onClick={resetChallenge}
                        className={styles.challengeFailedButton}
                        >
                            Falhei
                        </button>
                        <button 
                        onClick={completeChallenge}
                        type="button"
                        className={styles.challengeSucceededButton}
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