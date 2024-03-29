import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengeContext } from './ChallengeContext';

interface CountDownContextData{
    minutes: number,
    seconds: number,
    hasFinished: boolean,
    isActive: boolean,
    startCountDown: () => void,
    resetCountDown: () => void,
}

interface CountDownProviderProps{
    children: ReactNode;
}

export const CountDownContext = createContext({} as CountDownContextData)

let countDownTimeout: NodeJS.Timeout;
export function CountDownProvider({children}:CountDownProviderProps) {
    const {startNewChallenge} = useContext(ChallengeContext);
    const [time, setTime] = useState<number>(0.05*60);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [hasFinished, setHasFinished] = useState<boolean>(false);

    const minutes = Math.floor(time/60);
    const seconds = time%60;

    function startCountDown() {
        setIsActive(true);
    }

    function resetCountDown() {
        clearTimeout(countDownTimeout);
        setHasFinished(false);
        setIsActive(false);
        setTime(0.05*60);
    }
    useEffect(() => {
        if(isActive && time>0){
            countDownTimeout =  setTimeout(() => {
                setTime(time-1)
            }, 1000)
        }else if(isActive && time === 0){
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()
        }
    },[isActive, time])

    return(
        <CountDownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountDown,
            resetCountDown,
        }}>
            {children}
        </CountDownContext.Provider>
    )
}