import { useEffect, useState, useRef } from 'react';
import api from '../services/api';
import '../styles/css/Dashboard.css';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [checkinActive, setCheckinActive] = useState(false);
    const [treadmillActive, setTreadmillActive] = useState(false);
    const [checkinStart, setCheckinStart] = useState(null);
    const [treadmillStart, setTreadmillStart] = useState(null);
    const [checkinElapsed, setCheckinElapsed] = useState(0);
    const [treadmillElapsed, setTreadmillElapsed] = useState(0);
    const [needsEval, setNeedsEval] = useState(false);
    const [todayWorkout, setTodayWorkout] = useState(null);
    const [stats, setStats] = useState({ academyMinutes: 0, treadmillMinutes: 0, academyGoal: 60, treadmillGoal: 30 });
    const [workouts, setWorkouts] = useState([]);
    const [recommendedType, setRecommendedType] = useState(null);

    const checkinInterval = useRef(null);
    const treadmillInterval = useRef(null);

    // Carregar dados iniciais
    useEffect(() => {
        loadUserData();
        loadActiveSessions();
        loadTodayWorkout();
        checkEvaluation();
        loadTodayStats();
        loadAllWorkouts();
        loadRecommendedWorkout();

        return () => {
            if (checkinInterval.current) clearInterval(checkinInterval.current);
            if (treadmillInterval.current) clearInterval(treadmillInterval.current);
        };
    }, []);

    // Timer para check-in
    useEffect(() => {
        if (checkinActive && checkinStart) {
            const updateTimer = () => {
                const now = Date.now();
                const elapsed = Math.floor((now - checkinStart.getTime()) / 1000);
                setCheckinElapsed(elapsed);
            };
            updateTimer();
            if (checkinInterval.current) clearInterval(checkinInterval.current);
            checkinInterval.current = setInterval(updateTimer, 1000);
        } else {
            if (checkinInterval.current) clearInterval(checkinInterval.current);
            setCheckinElapsed(0);
        }
    }, [checkinActive, checkinStart]);

    // Timer para esteira
    useEffect(() => {
        if (treadmillActive && treadmillStart) {
            const updateTimer = () => {
                const now = Date.now();
                const elapsed = Math.floor((now - treadmillStart.getTime()) / 1000);
                setTreadmillElapsed(elapsed);
            };
            updateTimer();
            if (treadmillInterval.current) clearInterval(treadmillInterval.current);
            treadmillInterval.current = setInterval(updateTimer, 1000);
        } else {
            if (treadmillInterval.current) clearInterval(treadmillInterval.current);
            setTreadmillElapsed(0);
        }
    }, [treadmillActive, treadmillStart]);

    const loadActiveSessions = async () => {
        try {
            const checkinRes = await api.get('/checkins/active');
            if (checkinRes.data && checkinRes.data.checkinTime) {
                setCheckinActive(true);
                setCheckinStart(new Date(checkinRes.data.checkinTime));
            } else {
                setCheckinActive(false);
                setCheckinStart(null);
            }

            const treadmillRes = await api.get('/treadmill/active');
            if (treadmillRes.data && treadmillRes.data.startTime) {
                setTreadmillActive(true);
                setTreadmillStart(new Date(treadmillRes.data.startTime));
            } else {
                setTreadmillActive(false);
                setTreadmillStart(null);
            }
        } catch (err) {
            console.error('Erro ao carregar sessões ativas', err);
        }
    };

    const handleCheckinClick = async () => {
        try {
            if (checkinActive) {
                await api.post('/checkins/out');
                setCheckinActive(false);
                setCheckinStart(null);
            } else {
                const res = await api.post('/checkins/in');
                setCheckinActive(true);
                setCheckinStart(new Date(res.data.checkinTime));
            }
            // Recarregar estatísticas do dia
            loadTodayStats();
        } catch (err) {
            console.error('Erro no check-in/out', err);
        }
    };

    const handleTreadmillClick = async () => {
        try {
            if (treadmillActive) {
                await api.post('/treadmill/end');
                setTreadmillActive(false);
                setTreadmillStart(null);
            } else {
                const res = await api.post('/treadmill/start');
                setTreadmillActive(true);
                setTreadmillStart(new Date(res.data.startTime));
            }
            loadTodayStats();
        } catch (err) {
            console.error('Erro na esteira', err);
        }
    };

    const loadUserData = async () => {
        const res = await api.get('/users/profile');
        setUser(res.data);
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
        } catch (err) {
            console.error(err);
        }
    };

    const loadAllWorkouts = async () => {
        const res = await api.get('/workouts/all');
        setWorkouts(res.data);
    };

    const loadRecommendedWorkout = async () => {
        const res = await api.get('/workouts/today');
        setRecommendedType(res.data.type);
    };

    const handleRenewEvaluation = async () => {
        await api.post('/users/renew-evaluation');
        setNeedsEval(false);
        alert('Avaliação renovada por 3 meses!');
    };

    const formatTime = (sec) => {
        if (sec === undefined || sec === null) return "0m 0s";
        const mins = Math.floor(sec / 60);
        const segs = sec % 60;
        return `${mins}m ${segs}s`;
    };

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
                <div className="action-button">
                    <button
                        onClick={handleCheckinClick}
                        className={checkinActive ? "active-btn" : ""}
                    >
                        {checkinActive ? "Finalizar Check-in" : "Iniciar Check-in"}
                    </button>
                    {checkinActive && <div className="timer">⏱️ {formatTime(checkinElapsed)}</div>}
                </div>
                <div className="action-button">
                    <button
                        onClick={handleTreadmillClick}
                        className={treadmillActive ? "active-btn" : ""}
                    >
                        {treadmillActive ? "Finalizar Esteira" : "Iniciar Esteira"}
                    </button>
                    {treadmillActive && <div className="timer">⏱️ {formatTime(treadmillElapsed)}</div>}
                </div>
            </div>

            {/* Barras de progresso */}
            <div className="progress-section">
                <div className="progress-card">
                    <div className="progress-header">
                        <span>🏋️ Tempo na academia hoje</span>
                        <span>{stats.academyMinutes} / {stats.academyGoal} min {academyReached && '✅'}</span>
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
                        <span>{stats.treadmillMinutes} / {stats.treadmillGoal} min {treadmillReached && '✅'}</span>
                    </div>
                    <div className="progress-bar-container">
                        <div className="progress-bar treadmill-bar" style={{ width: `${treadmillPercentage}%` }}>
                            <span className="progress-label">{Math.round(treadmillPercentage)}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Treinos da semana */}
            <div className="workouts-section">
                <h3>Treinos da semana</h3>
                <div className="workouts-list">
                    {workouts.map(workout => (
                        <div key={workout.type} className={`workout-card ${recommendedType === workout.type ? 'recommended' : ''}`}>
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