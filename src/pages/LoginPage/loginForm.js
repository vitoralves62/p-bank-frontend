import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './loginForm.module.css';
import usericon from '../../assets/usericon.png';
import passicon from '../../assets/passIcon.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const navigate = useNavigate();
    const { handleSubmit, control, setError, formState: { errors } } = useForm();

    const onSubmit = useCallback(async (data) => {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            console.log('Resposta da API:', responseData);
            if (response) {
                const { accessToken } = responseData;
                console.log('access', accessToken);
                localStorage.setItem('accessToken', accessToken);
                navigate('/home');
            } else {
                setError('email', {
                    type: 'manual',
                    message: 'Falha na autenticação. Verifique suas credenciais.',
                });
            }
        } catch (error) {
            console.error('Erro na requisição: ', error);
        }
    }, [navigate, setError]);

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <img
                    className={styles.usericon}
                    src={usericon}
                    alt="Icone indicando usuário"
                />
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
                {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div>
                <img
                    className={styles.passicon}
                    src={passicon}
                    alt="Icone indicando senha"
                />
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
                {errors.password && <span>{errors.password.message}</span>}
            </div>
            <button
                type="submit"
                disabled={false} // O react-hook-form cuida do estado de submissão automaticamente
                className={styles.loginButton}
            >
                Entrar
            </button>
        </form>
    );
}