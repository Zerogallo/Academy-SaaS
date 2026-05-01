import { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/css/Ranking.css';

export default function Ranking() {
    const [ranking, setRanking] = useState([]);
    const [comments, setComments] = useState([]);
    const [period, setPeriod] = useState('month');

    useEffect(() => {
        loadRanking();
        loadComments();
    }, [period]);

    const loadRanking = async () => {
        const res = await api.get(`/rankings?period=${period}`);
        setRanking(res.data);
    };

    const loadComments = async () => {
        const res = await api.get('/comments/all');
        setComments(res.data);
    };

    const handleReaction = async (commentId, type) => {
        try {
            await api.post(`/comments/${commentId}/react`, { type });
            loadComments(); // recarrega para atualizar likes/dislikes
        } catch (err) {
            console.error('Erro ao reagir');
        }
    };

    // Mapear comentários por ID do usuário
    const commentMap = comments.reduce((acc, c) => {
        acc[c.user.id] = c;
        return acc;
    }, {});

    return (
        <div className="ranking">
            <h2>Ranking Geral</h2>
            <div className="period-selector">
                <button onClick={() => setPeriod('week')} className={period === 'week' ? 'active' : ''}>Semana</button>
                <button onClick={() => setPeriod('month')} className={period === 'month' ? 'active' : ''}>Mês</button>
            </div>
            <div className="ranking-list">
                {ranking.map((user, idx) => {
                    const userComment = commentMap[user.id];
                    return (
                        <div key={user.id} className="ranking-item">
                            <div className="ranking-position">{idx + 1}º</div>
                            <img src={`http://localhost:3000/${user.photo}`} alt={user.name} className="ranking-avatar" />
                            <div className="ranking-info">
                                <h3>{user.name}</h3>
                                <p>⏱️ {user.totalAcademy} min na academia</p>
                                <p>🏃 {user.totalTreadmill} min na esteira</p>
                                {userComment && (
                                    <div className="comment-box">
                                        <p className="comment-text">💬 {userComment.content}</p>
                                        <div className="reactions">
                                            <button onClick={() => handleReaction(userComment.id, 'like')}>👍 {userComment.likes}</button>
                                            <button onClick={() => handleReaction(userComment.id, 'dislike')}>👎 {userComment.dislikes}</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}