import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/css/components/Navbar.css';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            const fetchUser = async () => {
                try {
                    const response = await api.get('/users/profile');
                    setUser(response.data);
                } catch (error) {
                    console.error('Erro ao carregar usuário:', error);
                    // Se token inválido, desloga
                    if (error.response?.status === 401) {
                        localStorage.removeItem('token');
                        navigate('/login');
                    }
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [token, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (!token) return null;
    if (loading) return null; // ou exibir navbar vazia enquanto carrega

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/dashboard">Academy SaaS</Link>
            </div>
            <div className="nav-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/ranking">Ranking</Link>
                <Link to="/workouts/A">Treinos</Link>
                <Link to="/profile">Meu Perfil</Link>
                <div className="user-info">
                    {user?.photo && (
                        <img
                            src={`http://localhost:3000/${user.photo}`}
                            alt={user.name}
                            className="user-avatar"
                        />
                    )}
                    <span className="user-name">{user?.name}</span>
                    <button onClick={handleLogout} className="logout-btn">Sair</button>
                </div>
            </div>
        </nav>
    );
}