import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/css/WorkoutDetails.css';

export default function WorkoutDetails() {
    const [allWorkouts, setAllWorkouts] = useState([]);
    const [recommendedType, setRecommendedType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Carrega todos os treinos (com detalhes completos)
                const allRes = await api.get('/workouts/all');
                setAllWorkouts(allRes.data);
                // Carrega o treino recomendado do dia
                const todayRes = await api.get('/workouts/today');
                setRecommendedType(todayRes.data.type);
            } catch (err) {
                setError('Erro ao carregar os treinos.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="workout-details-container">Carregando...</div>;
    if (error) return <div className="workout-details-container error">{error}</div>;

    return (
        <div className="workout-details-container">
            {/* Cards de resumo dos treinos (opcionais, mas mantêm a identidade) */}
            <div className="workouts-section">
                <h3>Treinos da semana</h3>
                <div className="workouts-list">
                    {allWorkouts.map((w) => (
                        <div
                            key={w.type}
                            className={`workout-card ${recommendedType === w.type ? 'recommended' : ''}`}
                        >
                            <div className="workout-header">
                                <span className="workout-type">Treino {w.type}</span>
                                {recommendedType === w.type && <span className="badge">⭐ Recomendado para hoje</span>}
                            </div>
                            <ul>
                                {w.exercises.map((ex) => (
                                    <li key={ex}>{ex}</li>
                                ))}
                            </ul>
                            <p className="always-treadmill">🏃 + Esteira (registrar tempo separadamente)</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detalhes completos dos 3 treinos A, B e C */}
            <div className="all-workouts-details">
                {allWorkouts.map((workout) => (
                    <div key={workout.type} className="workout-detail-block">
                        <h2 className="workout-detail-title">
                            Treino {workout.type} - Ficha completa
                            {recommendedType === workout.type && <span className="today-badge">🔥 Treino de hoje</span>}
                        </h2>
                        <p className="workout-detail-subtitle">🏃‍♂️ Ao finalizar, faça {workout.always}</p>
                        <div className="exercises-grid">
                            {workout.details.map((ex, idx) => (
                                <div key={idx} className="exercise-card">
                                    <h3>{ex.nome}</h3>
                                    <div className="exercise-details">
                                        <p><strong>🏋️ Aparelho:</strong> {ex.aparelho}</p>
                                        <p><strong>📊 Séries:</strong> {ex.series}</p>
                                        <p><strong>🔄 Repetições:</strong> {ex.repeticoes}</p>
                                        {ex.obs && <p className="obs"><strong>💡 Dica:</strong> {ex.obs}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="workout-footer">
                <Link to="/dashboard" className="back-btn">← Voltar ao Dashboard</Link>
                <p>⚡ Não se esqueça de aquecer antes e alongar depois!</p>
            </div>
        </div>
    );
}