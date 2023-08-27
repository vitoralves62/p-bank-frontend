import styles from './button.module.css';
import { Children } from "react";

export default function Button ({children}) {
    return(
        <button
            className={styles.button}
        >   
            {children}
        </button>
    )
}
    