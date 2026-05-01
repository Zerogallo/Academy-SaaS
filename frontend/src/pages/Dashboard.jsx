import { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/css/Dashboard.css';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [activeCheckin, setActiveCheckin] = useState(false);
    const [activeTreadmill, setActiveTreadmill] = useState(false);
    const [needsEval, setNeedsEval] = useState(false);
    const [todayWorkout, setTodayWorkout] = useState(null);
    const [stats, setStats] = useState({ academyMinutes: 0, treadmillMinutes: 0, academyGoal: 60, treadmillGoal: 30 });
    const [loadingStats, setLoadingStats] = useState(true);

    const [workouts, setWorkouts] = useState([]);
    const [recommendedType, setRecommendedType] = useState(null);

    useEffect(() => {
        loadUserData();
        loadActiveCheckin();
        loadActiveTreadmill();
        loadTodayWorkout();
        checkEvaluation();
        loadTodayStats();

        loadAllWorkouts();
        loadRecommendedWorkout();
    }, []);




    const loadAllWorkouts = async () => {
        const res = await api.get('/workouts/all');
        setWorkouts(res.data);
    };

    const loadRecommendedWorkout = async () => {
        const res = await api.get('/workouts/today');
        setRecommendedType(res.data.type);
    };

    const loadUserData = async () => {
        const res = await api.get('/users/profile');
        setUser(res.data);
    };

    const loadActiveCheckin = async () => {
        const res = await api.get('/checkins/active');
        setActiveCheckin(!!res.data);
    };

    const loadActiveTreadmill = async () => {
        const res = await api.get('/treadmill/active');
        setActiveTreadmill(!!res.data);
    };

    const loadTodayWorkout = async () => {
        const res = await api.get('/workouts/today');
        setTodayWorkout(res.data);
    };

    const checkEvaluation = async () => {
        const res = await api.get('/users/needs-evaluation');
        setNeedsEval(res.data.needs);
    };

    const loadTodayStats = async () => {
        try {
            const res = await api.get('/stats/today');
            setStats(res.data);
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
        } finally {
            setLoadingStats(false);
        }
    };

    const handleCheckin = async () => {
        await api.post('/checkins/in');
        loadActiveCheckin();
        loadTodayStats();
    };

    const handleCheckout = async () => {
        await api.post('/checkins/out');
        loadActiveCheckin();
        loadTodayStats();
    };

    const handleStartTreadmill = async () => {
        await api.post('/treadmill/start');
        setActiveTreadmill(true);
    };

    const handleEndTreadmill = async () => {
        await api.post('/treadmill/end');
        setActiveTreadmill(false);
        loadTodayStats();
    };

    const handleRenewEvaluation = async () => {
        await api.post('/users/renew-evaluation');
        setNeedsEval(false);
        alert('Avaliação renovada por 3 meses!');
    };

    // Cálculo das porcentagens para as barras
    const academyPercentage = Math.min(100, (stats.academyMinutes / stats.academyGoal) * 100);
    const treadmillPercentage = Math.min(100, (stats.treadmillMinutes / stats.treadmillGoal) * 100);

    const academyReached = stats.academyMinutes >= stats.academyGoal;
    const treadmillReached = stats.treadmillMinutes >= stats.treadmillGoal;

    if (!user) return <div>Carregando...</div>;

    return (
        <div className="dashboard">
            <div className="user-info">
                <img src={`http://localhost:3000/${user.photo}`} alt={user.name} />
                <h2>{user.name}</h2>
                {needsEval && (
                    <div className="alert">
                        ⚠️ Avaliação vencida! Renove a cada 3 meses.
                        <button onClick={handleRenewEvaluation}>Renovar Avaliação</button>
                    </div>
                )}
            </div>

            <div className="actions">
                <button onClick={activeCheckin ? handleCheckout : handleCheckin}>
                    {activeCheckin ? 'Fazer Check-out' : 'Fazer Check-in'}
                </button>
                <button onClick={activeTreadmill ? handleEndTreadmill : handleStartTreadmill}>
                    {activeTreadmill ? 'Finalizar Esteira' : 'Iniciar Esteira'}
                </button>
            </div>


            {/* Barras de Progresso */}
            <div className="progress-section">
                <div className="progress-card">
                    <div className="progress-header">
                        <span>🏋️ Tempo na academia hoje</span>
                        <span>
                            {stats.academyMinutes} / {stats.academyGoal} min
                            {academyReached && ' ✅ Meta atingida!'}
                        </span>
                    </div>
                    <div className="progress-bar-container">
                        <div className="progress-bar academy-bar" style={{ width: `${academyPercentage}%` }}>
                            <span className="progress-label">{Math.round(academyPercentage)}%</span>
                        </div>
                    </div>
                </div>

                <div className="progress-card">
                    <div className="progress-header">
                        <span>🏃 Esteira hoje</span>
                        <span>
                            {stats.treadmillMinutes} / {stats.treadmillGoal} min
                            {treadmillReached && ' ✅ Meta atingida!'}
                        </span>
                    </div>
                    <div className="progress-bar-container">
                        <div className="progress-bar treadmill-bar" style={{ width: `${treadmillPercentage}%` }}>
                            <span className="progress-label">{Math.round(treadmillPercentage)}%</span>
                        </div>
                    </div>
                </div>
            </div>


            <div className="workouts-section">
                <h3>Treinos da semana</h3>
                <div className="workouts-list">
                    {workouts.map(workout => (
                        <div
                            key={workout.type}
                            className={`workout-card ${recommendedType === workout.type ? 'recommended' : ''}`}
                        >
                            <div className="workout-header">
                                <span className="workout-type">Treino {workout.type}</span>
                                {recommendedType === workout.type && <span className="badge">⭐ Recomendado para hoje</span>}
                            </div>
                            <ul>
                                {workout.exercises.map(ex => <li key={ex}>{ex}</li>)}
                            </ul>
                            <p className="always-treadmill">🏃 + Esteira (registrar tempo separadamente)</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}