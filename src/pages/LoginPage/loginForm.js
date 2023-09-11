import React, { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './loginForm.module.css';
import usericon from '../../assets/usericon.png';
import passicon from '../../assets/passIcon.png';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const navigate = useNavigate();
    const { handleSubmit, control,  formState: { errors } } = useForm();
    const [authError, setAuthError] = useState(null);

    const port = process.env.REACT_APP_BACKEND_PORT;
    const rote = process.env.REACT_APP_BACKEND_ROTE;

    const onSubmit = useCallback(async (data) => {
        try {
            const response = await fetch(`http://${rote}:${port}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            
            if (response.ok) {
                const { accessToken } = responseData;
                
                localStorage.setItem('accessToken', accessToken);
                navigate('/home');
            } else {
                setAuthError('Usuário e/ou senha incorretos.');
            }
        } catch (error) {
            console.error('Erro na requisição: ', error);
        }
    }, [navigate]);

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>  
           {authError && <span className={styles.errorMessage}>{authError}</span>}
           <div>
                <label className={styles.EmailContainer}>
                    
                    <Controller
                        render={({ field }) => (
                            <input
                                {...field}
                                type="email"
                                placeholder="Email"
                                className={styles.email}
                            />
                        )}
                        control={control}
                        name="email"
                        rules={{
                            required: 'Campo obrigatório',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Endereço de email inválido',
                            },
                        }}
                    />
                    <img
                        className={styles.usericon}
                        src={usericon}
                        alt="Icone indicando usuário"
                    />
                </label>
                {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div>
                <label className={styles.PasswordContainer}>
                    
                    <Controller
                        render={({ field }) => (
                            <input
                                {...field}
                                type="password"
                                placeholder="Senha"
                                className={styles.password}
                            />
                        )}
                        control={control}
                        name="password"
                        rules={{ required: 'Campo obrigatório', minLength: 6 }}
                    />
                    <img
                        className={styles.passicon}
                        src={passicon}
                        alt="Icone indicando senha"
                    />
                </label>
                {errors.password && <span>{errors.password.message}</span>}
            </div>
            
            <button
                type="submit"
                disabled={false}
                className={styles.loginButton}
            >
                Entrar
            </button>
        </form>
    );
}