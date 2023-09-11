import Background from "../../components/Background/bg.js";
import styles from "./login.module.css";
import circle from "../../assets/circle.png";
import LoginForm from "./loginForm.js";
import logoPBank from "../../assets/logoPbank.png";
import logoPoli from "../../assets/logoPoli.png";
import { useState } from "react";
import Title from "../../components/Title/title.js";

export default function LoginPage (){
    const [authError, setAuthError] = useState(null);
    return(
        <main>
            <Background />
            <Title/>
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
                    <LoginForm authError={authError} setAuthError={setAuthError} />
                </div>
            </div>
        </main>
    )
}