import Background from "../../components/Background/bg.js";
import logoPoli from "../../assets/logoPoli.png";
import logoP from "../../assets/logoP2.png";
import styles from "./home.module.css";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [userName, setUserName] = useState("");
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [balanceValue, setBalanceValue] = useState(0);

  const decodeJWT = useCallback((token) => {
    if (!token) {
      return null;
    }

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

    const payload = JSON.parse(jsonPayload);

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    return payload;
  }, []);

  useEffect(() => {
    if (!accessToken) {
      localStorage.removeItem('accessToken');
    }
  }, [accessToken]);

  const decodedToken = useMemo(() => decodeJWT(accessToken), [decodeJWT, accessToken]);

  const navigate = useNavigate();

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

      setUserName(responseData.name);

      if (responseData.balance && responseData.balance.value) {
        let balanceValue = responseData.balance.value;
        let finalBalance = balanceValue * 0.91;
        setBalanceValue(finalBalance);
      }
    } catch (error) {
      console.error('Erro na requisição: ', error);
    }
  }, [accessToken]);
  
  useEffect(() => {
    if (!decodedToken || !decodedToken.id) {
      navigate('/login');
    } else {
      getUserData(decodedToken.id);
    }
  }, [decodedToken, navigate]);

  const formatUserName = (name) => {
    const names = name.split(' ');
    if (names.length === 1) {
      return names[0];
    } else if (names.length >= 2) {
      const firstName = names[0];
      const secondName = names[1].length < 4 ? names[2] : names[1];
      return `${firstName} ${secondName}`;
    }
    return name;
  };

  return (
    <main>
      <Background />
      <div className={styles.WhiteSquare}>
        <img
          className={styles.logoPoli}
          src={logoPoli}
          alt="Logo da Poli"
        />
      </div>
      <div className={styles.PurpleSquare}>
          
          <img
            className={styles.logoP}
            src={logoP}
            alt="Logo do P-bank"
          />
          <div className={styles.HelloContainer}>
            <div className={styles.WelcomeText}>
              <h1 className={styles.Hello}>Olá, {userName ? formatUserName(userName) : "Polilover"}!</h1>
              <h2 className={styles.HelloText} >É um prazer ter você aqui!</h2>
            </div>
          </div>
          <div className={styles.Balance}>
            <div className={styles.BalanceText}>Saldo:</div>
            <div className={styles.BalanceSquare}>
              <div className={styles.BalanceNumber}>P$ {balanceValue}</div>
            </div>
          </div>
      </div>
 
    </main>
  );
}
