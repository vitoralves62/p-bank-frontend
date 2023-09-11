import styles from './adminPage.module.css';
import Background from '../../components/Background/bg';
import logoPbank from '../../assets/logoPbank.png'

export default function adminPage(){
    return(
        <main>
            <Background/>
            <div className={styles.BG}>
                <div className={styles.PurpleSquare}>
                    <nav className={styles.NAV}>
                        <ul>
                            <li>
                                <a>Cadastrar usuário</a>
                            </li>
                            <li>
                                <a>Cadastrar saldos</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className={styles.WhiteSquare}>
                    Teste
                </div>
            </div>            
            
        </main>
    )
}