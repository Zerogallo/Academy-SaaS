import { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/css/Profile.css';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadUser();
        loadComment();
    }, []);

    const loadUser = async () => {
        const res = await api.get('/users/profile');
        setUser(res.data);
        setName(res.data.name);
        setPhotoPreview(`http://localhost:3000/${res.data.photo}`);
    };

    const loadComment = async () => {
        try {
            const res = await api.get('/comments/me');
            if (res.data) setComment(res.data.content);
        } catch (err) {
            console.error('Erro ao carregar comentário');
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            // Atualizar perfil (nome e foto)
            const formData = new FormData();
            formData.append('name', name);
            if (photo) formData.append('photo', photo);
            await api.put('/users/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Atualizar comentário
            await api.post('/comments/me', { content: comment });

            setMessage('Perfil atualizado com sucesso!');
            loadUser(); // recarrega dados
        } catch (err) {
            setMessage('Erro ao atualizar');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div>Carregando...</div>;

    return (
        <div className="profile-container">
            <h2>Meu Perfil</h2>
            <form onSubmit={handleSubmit} className="profile-form">
                <div className="photo-area">
                    <img src={photoPreview} alt="Preview" className="profile-photo" />
                    <label className="photo-upload-btn">
                        Alterar foto
                        <input type="file" accept="image/*" onChange={handlePhotoChange} hidden />
                    </label>
                </div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome"
                    required
                />
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escreva um comentário (será exibido no ranking)"
                    rows="3"
                    maxLength="500"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar alterações'}
                </button>
                {message && <p className={message.includes('sucesso') ? 'success' : 'error'}>{message}</p>}
            </form>
        </div>
    );
}