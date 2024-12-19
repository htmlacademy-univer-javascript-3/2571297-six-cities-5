import { Provider } from 'react-redux';
import { store } from '../store';
import { AppRouter } from './app-router';
import { BrowserRouter } from 'react-router-dom';
import { ErrorMessage } from '../components/error-message';
import { useAppSelector } from '../hooks/use-app-selector';
import { selectCommonData } from '../store/selectors';

const AppContent = () => {
  const { isServerUnavailable } = useAppSelector(selectCommonData);

  return (
    <>
      {isServerUnavailable && <ErrorMessage />}
      <AppRouter />
    </>
  );
};

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </Provider>
);

export default App;
