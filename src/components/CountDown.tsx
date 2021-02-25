
import { useContext } from 'react';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/CountDown.module.css'


export function CountDown() {
    const {
        seconds, 
        minutes, 
        hasFinished, 
        resetCountDown, 
        startCountDown, 
        isActive
    } = useContext(CountDownContext);
  
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
    

    return(
    <div>
        <div className={styles.countDownContainer}>
        <div>
            <span>{minuteLeft}</span>
            <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
            <span>{secondLeft}</span>
            <span>{secondRight}</span>
        </div>
    </div>
    {hasFinished ? (
        <button
        disabled
        className={styles.countDownButton}
        >
            Ciclo encerrado
        </button>
    ):(
        <>
    {isActive ?(
            <button 
                onClick={resetCountDown} 
                type="button" 
                className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
            >
                Abandonar Ciclo  
            </button>
            ) : (
            <button 
                onClick={startCountDown} 
                type="button" 
                className={styles.countDownButton}
            >
                Iniciar um Ciclo 
            </button>
    )}
        </>
    )}

  </div>
    )
}