import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/css/Login.css';
import logo from '../assets/academia.jpg';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/login', { email, password });
            console.log('Resposta do login:', response.data);

            if (response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);
                navigate('/dashboard');
            } else {
                setError('Token não recebido. Tente novamente.');
            }
        } catch (err) {
            console.error('Erro no login:', err);
            if (err.response) {
                // Resposta com erro do servidor (401, 400, etc)
                setError(err.response.data.message || 'Credenciais inválidas');
            } else if (err.request) {
                // Sem resposta do servidor
                setError('Servidor offline. Verifique se o backend está rodando em http://localhost:3000');
            } else {
                setError('Erro ao conectar. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <img src={logo} alt="Academy SaaS Logo" className="logo" />

                <h2>Acesse sua conta</h2>

                {error && <div className="error-message">{error}</div>}

                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>

                <div className="register-link">
                    Não tem conta? <Link to="/register">Cadastre-se</Link>
                </div>
            </form>
        </div>
    );
}