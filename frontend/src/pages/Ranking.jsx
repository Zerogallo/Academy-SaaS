import { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/css/Ranking.css';

export default function Ranking() {
    const [ranking, setRanking] = useState([]);
    const [period, setPeriod] = useState('month');

    useEffect(() => {
        loadRanking();
    }, [period]);

    const loadRanking = async () => {
        const res = await api.get(`/rankings?period=${period}`);
        setRanking(res.data);
    };

    return (
        <div className="ranking">
            <h2>Ranking de Tempo na Academia</h2>
            <div className="period-selector">
                <button onClick={() => setPeriod('week')} className={period === 'week' ? 'active' : ''}>Última semana</button>
                <button onClick={() => setPeriod('month')} className={period === 'month' ? 'active' : ''}>Último mês</button>
            </div>
            <div className="podium">
                {ranking.map((user, idx) => (
                    <div key={user.id} className={`podium-place place-${idx + 1}`}>
                        <div className="position">{idx + 1}º Lugar</div>
                        <img src={`http://localhost:3000/${user.photo}`} alt={user.name} />
                        <h3>{user.name}</h3>
                        <p>⏱️ Total academia: {user.totalAcademy} min</p>
                        <p>🏃 Esteira: {user.totalTreadmill} min</p>
                    </div>
                ))}
            </div>
        </div>
    );
}