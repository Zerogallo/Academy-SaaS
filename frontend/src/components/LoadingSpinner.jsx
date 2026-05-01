import '../styles/css/components/LoadingSpinner.css';

export default function LoadingSpinner() {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <p>Carregando...</p>
        </div>
    );
}