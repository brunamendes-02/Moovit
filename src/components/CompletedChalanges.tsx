import { useContext } from 'react';
import { ChalangeContext } from '../contexts/ChalangeContext';
import styles from '../styles/components/CompletedChalanges.module.css'
export function  CompletedChalanges() {
    const {chalangeCompleted} = useContext(ChalangeContext)
    return(
        <div className={styles.completedChalangesContainer}>
            <span>Desafios completos</span>
            <span>{chalangeCompleted}</span>
        </div>
    );
}