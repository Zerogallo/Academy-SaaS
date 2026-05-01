import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/css/WorkoutDetails.css';

export default function WorkoutDetails() {
    const { type } = useParams();
    const navigate = useNavigate();
    const [workout, setWorkout] = useState(null);
    const [allWorkouts, setAllWorkouts] = useState([]);
    const [recommendedType, setRecommendedType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Carrega treino recomendado do dia
                const todayRes = await api.get('/workouts/today');
                const recommended = todayRes.data.type;
                setRecommendedType(recommended);

                // Carrega todos os treinos
                const allRes = await api.get('/workouts/all');
                setAllWorkouts(allRes.data);

                // Se não houver type na URL, redireciona para o recomendado
                if (!type) {
                    navigate(`/workouts/${recommended}`, { replace: true });
                    return;
                }

                // Carrega detalhes do treino solicitado
                const workoutRes = await api.get(`/workouts/${type}`);
                setWorkout(workoutRes.data);
            } catch (err) {
                setError('Treino não encontrado. Use A, B ou C.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [type, navigate]);

    const handleCardClick = (workoutType) => {
        navigate(`/workouts/${workoutType}`);
    };

    if (loading) return <div className="workout-details-container">Carregando...</div>;
    if (error) return <div className="workout-details-container error">{error}</div>;
    if (!workout) return null;

    return (
        <div className="workout-details-container">
            {/* Seção de cards com todos os treinos */}
            <div className="workouts-section">
                <h3>Treinos da semana</h3>
                <div className="workouts-list">
                    {allWorkouts.map((w) => (
                        <div
                            key={w.type}
                            className={`workout-card ${recommendedType === w.type ? 'recommended' : ''}`}
                            onClick={() => handleCardClick(w.type)}
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

            {/* Detalhes do treino selecionado */}
            <div className="workout-header-details">
                <h1>Treino {workout.type} - Detalhes</h1>
                <Link to="/dashboard" className="back-btn">← Voltar ao Dashboard</Link>
            </div>

            <div className="workout-info">
                <p className="always-treadmill">🏃‍♂️ Ao finalizar, faça {workout.always}</p>
            </div>

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

            <div className="workout-footer">
                <p>⚡ Não se esqueça de aquecer antes e alongar depois!</p>
            </div>
        </div>
    );
}