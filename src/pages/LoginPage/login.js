import Background from "../../components/Background/bg.js";
import styles from "./login.module.css";
import circle from "../../assets/circle.png";
import LoginForm from "./loginForm.js";
import logoPBank from "../../assets/logoPbank.png";
import logoPoli from "../../assets/logoPoli.png";

export default function LoginPage (){

    return(
        <main>
            <Background />
            <div className={styles.whiteSquare}>
                <div>
                    <img 
                        className={styles.logoPoli}
                        src={logoPoli}
                        alt="Logo da Poli"
                    />
                </div>
                <div>
                    <img
                        className={styles.circle}
                        src={circle}
                        alt="Circulo roxo com alguns paralelepipedos roxos arredondados"
                    />
                </div>
                    
                <div>
                    <img 
                        className={styles.PBankLogo}
                        src={logoPBank}
                        alt="Logo do P-bank"
                    />
                    <LoginForm />
                </div>
            </div>
        </main>
    )
}