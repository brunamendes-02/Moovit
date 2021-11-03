import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';
export function Profile(){
    const {level} = useContext(ChallengeContext);
    return(
        <div className={styles.profileContainer}>
            <img src="/bruna-mendes.jpeg" alt="Bruna Mendes"/>
            <div>
                <strong>Bruna Mendes</strong>
                <p>
                    <img style={{width: 20}} src="icons/level.svg" alt="seta apontando pra cima indicando o nivel"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}