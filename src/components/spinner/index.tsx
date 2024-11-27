import './styles.css';

interface SpinnerProps {
  fullPage?: boolean;
}

export const Spinner = ({ fullPage = false }: SpinnerProps) => (
  <div className={`spinner-container ${fullPage ? 'spinner-overlay' : ''}`}>
    <div className="spinner">
      <div className="spinner__circle"></div>
    </div>
  </div>
);
