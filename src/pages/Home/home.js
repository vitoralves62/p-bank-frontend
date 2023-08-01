import Background from "../../components/Background/bg.js";
import logoPoli from "../../assets/logoPoli.png";
import logoP from "../../assets/logoP2.png";
import styles from "./home.module.css"
import { useState, useEffect, useCallback, useMemo } from "react";

export default function HomePage() {
  const [userName, setUserName] = useState("");
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

  const decodeJWT = useCallback((token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  }, []);
  
  const decodedToken = useMemo(() => decodeJWT(accessToken), [decodeJWT, accessToken]);  
  const getUserData = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${accessToken}`
        },
      });
      const responseData = await response.json();
      console.log(response);
      setUserName(responseData.name);
    } catch (error) {
      console.error('Erro na requisição: ', error);
    }
  }, []);

  useEffect(() => {
    if (decodedToken && decodedToken.id) {
      getUserData(decodedToken.id);
    }
  }, [decodedToken, getUserData]);
  

  return (
    <main>
      <Background />
      <div className={styles.Square}>
        <div>
          <img
            className={styles.logoPoli}
            src={logoPoli}
            alt="Logo da Poli"
          />
          <img
            className={styles.logoP}
            src={logoP}
            alt="Logo do P-bank"
          />
          <div className={styles.WelcomeText}>
            <h1 className={styles.Hello}>Olá, {userName ? userName : "Polilover"}!</h1>
            <h2 className={styles.HelloText}>É um prazer ter você aqui!</h2>
          </div>
          <div className={styles.Balance}>
            <div className={styles.BalanceText}>Saldo:</div>
            <div className={styles.BalanceSquare}></div>
          </div>
        </div>
      </div>
    </main>
  );
}
