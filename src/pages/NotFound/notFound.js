import { useNavigate } from "react-router-dom";
import Background from "../../components/Background/bg.js"
import styles from "./notFound.module.css";

export default function NotFound(){
    const navigate = useNavigate();

    return(
        <div>
            <Background/>
            <div className={styles.WhiteSquare}>
                <div className={styles.NotFoundText}>
                    <div className={styles.Number}>404</div>
                    <div className={styles.Text}>Nada por aqui.</div>
                </div>
            </div>
        </div>
    )
}