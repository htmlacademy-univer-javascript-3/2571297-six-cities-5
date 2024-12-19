import { memo } from 'react';
import './styles.css';

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = memo(
  ({ message = 'Server is unavailable. Please try again later.' }: ErrorMessageProps) => (
    <div className="error-message" data-testid="error-message">
      <div className="error-message__content">
        <p className="error-message__text">{message}</p>
      </div>
    </div>
  )
);

ErrorMessage.displayName = 'ErrorMessage';
