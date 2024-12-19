import './styles.css';

interface SpinnerProps {
  isFullPage?: boolean;
}

export const Spinner = ({ isFullPage = false }: SpinnerProps) => (
  <div className={`spinner-container ${isFullPage ? 'spinner-overlay' : ''}`}>
    <div className="spinner">
      <div className="spinner__circle"></div>
    </div>
  </div>
);
