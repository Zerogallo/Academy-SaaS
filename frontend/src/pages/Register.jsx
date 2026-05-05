import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/css/Register.css';
import logo from '../assets/academia.jpg';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',

    });
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setError('A foto deve ter no máximo 2MB');
                return;
            }
            if (!file.type.startsWith('image/')) {
                setError('Selecione uma imagem válida (jpg, png, gif)');
                return;
            }
            setPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        if (formData.password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        if (formData.age < 10 || formData.age > 120) {
            setError('Idade deve estar entre 10 e 120 anos');
            return;
        }

        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('age', formData.age);
            if (photo) {
                formDataToSend.append('photo', photo);
            }

            const response = await api.post('/auth/register', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data) {
                // Após cadastro bem-sucedido, redireciona para o login
                alert('Cadastro realizado com sucesso! Faça login para continuar.');
                navigate('/login');
            }
        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Erro ao cadastrar. Tente novamente.');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <img src={logo} alt="Academy SaaS Logo" className="logo" />
                <h2>Criar Conta</h2>


                {error && <div className="error-message">{error}</div>}

                <div className="photo-upload">
                    <label htmlFor="photo" className="photo-label">
                        {photoPreview ? (
                            <img src={photoPreview} alt="Preview" className="photo-preview" />
                        ) : (
                            <div className="photo-placeholder">
                                <span>📸</span>
                                <p>Clique para adicionar foto</p>
                            </div>
                        )}
                        <input
                            type="file"
                            id="photo"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            style={{ display: 'none' }}
                        />
                    </label>
                </div>

                <input
                    type="text"
                    name="name"
                    placeholder="Nome completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Senha (mínimo 6 caracteres)"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar senha"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>

                <div className="login-link">
                    Já tem uma conta? <Link to="/login">Faça login</Link>
                </div>
            </form>
        </div>
    );
}