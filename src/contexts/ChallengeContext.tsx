import React, {createContext, ReactNode, useEffect, useState} from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengesInterface {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
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
    closeLevelUpModal: () => void;
    activeChallenge: ChallengesInterface;
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
    children, 
    ...rest
 }:ChallengesProviderProps) {
    const [level, setLevel] = useState<number>(rest.challengesCompleted ?? 1)
    const [currentExperience, setCurrentExperience] = useState<number>(rest.currentExperience ?? 0)
    const [challengeCompleted, setChallengeCompleted] = useState<number>(rest.challengesCompleted ?? 0)
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    },[])

    useEffect(()=> {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengeCompleted', String(challengeCompleted))
    },[level, currentExperience, challengeCompleted])


    function closeLevelUpModal() {
        setIsLevelModalOpen(false)
    }

    function levelUp() {
        setLevel(level + 1)
        setIsLevelModalOpen(true)
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
        closeLevelUpModal,
        }}>
        {children}

      {isLevelModalOpen && <LevelUpModal />}  
    </ChallengeContext.Provider>
    )
}