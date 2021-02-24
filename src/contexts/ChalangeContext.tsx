import {createContext, ReactNode, useState} from 'react';
import chalanges from '../../challenges.json';

interface ChalangesInterface {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChalangesProviderProps {
    children: ReactNode;
}

interface ChalangesContextData {
    level: number;
    experienceToNextLevel: number;
    levelUp: () => void, 
    currentExperience: number; 
    chalangeCompleted: number;
    startNewChalange: () => void;
    resetChalange: () => void;
    activeChalange: ChalangesInterface;
}

export const ChalangeContext = createContext({} as ChalangesContextData);

export function ChalangesProvider({children}:ChalangesProviderProps) {
    const [level, setLevel] = useState<number>(1)
    const [currentExperience, setCurrentExperience] = useState<number>(30)
    const [chalangeCompleted, setChalangeCompleted] = useState<number>(0)
    const [activeChalange, setActiveChalange] = useState(null);
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level +1)
    }

    function resetChalange() {
        setActiveChalange(null)
    }

    function startNewChalange() {
        const randomChalangeIndex = Math.floor(Math.random() * chalanges.length)
        const chalange = chalanges[randomChalangeIndex];
        setActiveChalange(chalange)
    }


    return(
    <ChalangeContext.Provider value={{
        level, 
        levelUp, 
        currentExperience, 
        chalangeCompleted,
        startNewChalange,
        activeChalange,
        resetChalange,
        experienceToNextLevel,
        }}>
        {children}
    </ChalangeContext.Provider>
    )
}