import {createContext, ReactNode, useEffect, useState} from 'react';
import challenges from '../../challenges.json';

interface ChallengesInterface {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

interface ChallengesContextData {
    level: number;
    experienceToNextLevel: number;
    levelUp: () => void, 
    currentExperience: number; 
    challengeCompleted: number;
    completeChallenge: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    activeChallenge: ChallengesInterface;
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children}:ChallengesProviderProps) {
    const [level, setLevel] = useState<number>(1)
    const [currentExperience, setCurrentExperience] = useState<number>(0)
    const [challengeCompleted, setChallengeCompleted] = useState<number>(0)
    const [activeChallenge, setActiveChallenge] = useState(null);
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    },[])


    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];
        
        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} xp`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if(!activeChallenge){
            return;
        }
        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;
        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengeCompleted(challengeCompleted + 1)
    }

    return(
    <ChallengeContext.Provider value={{
        level, 
        levelUp, 
        currentExperience, 
        challengeCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        experienceToNextLevel,
        }}>
        {children}
    </ChallengeContext.Provider>
    )
}