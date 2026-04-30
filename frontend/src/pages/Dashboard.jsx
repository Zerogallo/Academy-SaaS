import { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/css/Dashboard.css';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [activeCheckin, setActiveCheckin] = useState(false);
    const [activeTreadmill, setActiveTreadmill] = useState(false);
    const [needsEval, setNeedsEval] = useState(false);
    const [todayWorkout, setTodayWorkout] = useState(null);

    useEffect(() => {
        loadUserData();
        loadActiveCheckin();
        loadTodayWorkout();
        checkEvaluation();
    }, []);

    const loadUserData = async () => {
        const res = await api.get('/users/profile');
        setUser(res.data);
    };

    const loadActiveCheckin = async () => {
        const res = await api.get('/checkins/active');
        setActiveCheckin(!!res.data);
    };

    const loadTodayWorkout = async () => {
        const res = await api.get('/workouts/today');
        setTodayWorkout(res.data);
    };

    const checkEvaluation = async () => {
        const res = await api.get('/users/needs-evaluation');
        setNeedsEval(res.data.needs);
    };

    const handleCheckin = async () => {
        await api.post('/checkins/in');
        loadActiveCheckin();
    };

    const handleCheckout = async () => {
        await api.post('/checkins/out');
        loadActiveCheckin();
    };

    const handleStartTreadmill = async () => {
        await api.post('/treadmill/start');
        setActiveTreadmill(true);
    };

    const handleEndTreadmill = async () => {
        await api.post('/treadmill/end');
        setActiveTreadmill(false);
    };

    const handleRenewEvaluation = async () => {
        await api.post('/users/renew-evaluation');
        setNeedsEval(false);
        alert('Avaliação renovada por 3 meses!');
    };

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

            <div className="workout-card">
                <h3>Treino de hoje: {todayWorkout?.type}</h3>
                <ul>
                    {todayWorkout?.exercises.map(ex => <li key={ex}>{ex}</li>)}
                </ul>
                <p>{todayWorkout?.always}</p>
            </div>

            <div className="actions">
                <button onClick={activeCheckin ? handleCheckout : handleCheckin}>
                    {activeCheckin ? 'Fazer Check-out' : 'Fazer Check-in'}
                </button>
                <button onClick={activeTreadmill ? handleEndTreadmill : handleStartTreadmill}>
                    {activeTreadmill ? 'Finalizar Esteira' : 'Iniciar Esteira'}
                </button>
            </div>
        </div>
    );
}