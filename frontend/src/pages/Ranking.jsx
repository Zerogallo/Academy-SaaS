import { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/css/Ranking.css';

export default function Ranking() {
    const [ranking, setRanking] = useState([]);
    const [comments, setComments] = useState([]);
    const [period, setPeriod] = useState('month');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Carrega ranking e comentários sempre que o período mudar
    useEffect(() => {
        loadRanking();
        loadComments();
    }, [period]);

    const loadRanking = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/rankings?period=${period}`);
            setRanking(res.data);
            setError('');
        } catch (err) {
            console.error('Erro ao carregar ranking:', err);
            setError('Não foi possível carregar o ranking.');
        } finally {
            setLoading(false);
        }
    };

    const loadComments = async () => {
        try {
            const res = await api.get('/comments/all');
            setComments(res.data);
        } catch (err) {
            console.error('Erro ao carregar comentários:', err);
        }
    };

    const handleReaction = async (commentId, type) => {
        try {
            await api.post(`/comments/${commentId}/react`, { type });
            // Recarrega comentários para atualizar likes/dislikes
            loadComments();
        } catch (err) {
            console.error('Erro ao reagir:', err);
            alert('Não foi possível registrar sua reação. Tente novamente.');
        }
    };

    // Mapeia comentários por userId para acesso rápido
    const commentMap = comments.reduce((map, comment) => {
        map[comment.user.id] = comment;
        return map;
    }, {});

    if (loading) {
        return <div className="ranking"><h2>Carregando ranking...</h2></div>;
    }

    if (error) {
        return <div className="ranking"><h2>{error}</h2></div>;
    }

    return (
        <div className="ranking">
            <h2>🏆 Ranking de Tempo na Academia</h2>

            <div className="period-selector">
                <button
                    onClick={() => setPeriod('week')}
                    className={period === 'week' ? 'active' : ''}
                >
                    Última semana
                </button>
                <button
                    onClick={() => setPeriod('month')}
                    className={period === 'month' ? 'active' : ''}
                >
                    Último mês
                </button>
            </div>

            <div className="ranking-list">
                {ranking.length === 0 ? (
                    <p>Nenhum dado disponível para o período selecionado.</p>
                ) : (
                    ranking.map((user, idx) => {
                        // Define medalha conforme posição
                        let medal = '';
                        let medalClass = '';
                        if (idx === 0) {
                            medal = '🥇';
                            medalClass = 'medal-gold';
                        } else if (idx === 1) {
                            medal = '🥈';
                            medalClass = 'medal-silver';
                        } else if (idx === 2) {
                            medal = '🥉';
                            medalClass = 'medal-bronze';
                        } else {
                            medal = `${idx + 1}º`;
                        }

                        const userComment = commentMap[user.id];

                        return (
                            <div key={user.id} className="ranking-item">
                                <div className="ranking-position">
                                    <span className={`medal ${medalClass}`}>{medal}</span>
                                </div>
                                <img
                                    src={`http://localhost:3000/${user.photo}`}
                                    alt={user.name}
                                    className="ranking-avatar"
                                />
                                <div className="ranking-info">
                                    <h3>{user.name}</h3>
                                    <p>⏱️ Tempo na academia: {user.totalAcademy} min</p>
                                    <p>🏃 Tempo na esteira: {user.totalTreadmill} min</p>

                                    {userComment && (
                                        <div className="comment-box">
                                            <h1 className="comment-text">💬 {userComment.content}</h1>
                                            <div className="reactions">
                                                <button onClick={() => handleReaction(userComment.id, 'like')}>
                                                    👍 {userComment.likes || 0}
                                                </button>
                                                <button onClick={() => handleReaction(userComment.id, 'dislike')}>
                                                    👎 {userComment.dislikes || 0}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}