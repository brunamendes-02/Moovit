import styles from '../styles/components/Profile.module.css';
export function Profile(){
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/diego3g.png" alt="Diego Fernandes"/>
            <div>
                <strong>Diego Fernandes</strong>
                <p>
                    <img style={{width: 20}} src="icons/level.svg" alt="seta apontando pra cima indicando o nivel"/>
                    Level 1
                </p>
            </div>
        </div>
    );
}