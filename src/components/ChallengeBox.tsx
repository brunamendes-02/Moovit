import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengeContext)
    const {resetCountDown} = useContext(CountDownContext);

    function handleChallengeSucceeded() {
        completeChallenge();
        resetCountDown();

    }
    function handleChallengeFailed() {
        resetChallenge();
        resetCountDown();
    }

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
                        onClick={handleChallengeFailed}
                        className={styles.challengeFailedButton}
                        >
                            Falhei
                        </button>
                        <button 
                        onClick={handleChallengeSucceeded}
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