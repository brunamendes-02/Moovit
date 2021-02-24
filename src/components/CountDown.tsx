import { useState, useEffect, useContext } from 'react';
import { ChalangeContext } from '../contexts/ChalangeContext';
import styles from '../styles/components/CountDown.module.css'

let countDownTimeout: NodeJS.Timeout;

export function CountDown() {
    const {startNewChalange} = useContext(ChalangeContext);
    const [time, setTime] = useState<number>(0.05*60);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [hasFinished, setHasFinished] = useState<boolean>(false);

    const minutes = Math.floor(time/60);
    const seconds = time%60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
    
    function startCountDown() {
        setIsActive(true)
    }

    function resetCountDown() {
        clearTimeout(countDownTimeout)
        setIsActive(false)
        setTime(0.05*60)
    }
    useEffect(() => {
        if(isActive && time>0){
            countDownTimeout =  setTimeout(() => {
                setTime(time-1)
            }, 1000)
        }else if(isActive && time === 0){
            setHasFinished(true)
            setIsActive(false)
            startNewChalange()
        }
    },[isActive, time])

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