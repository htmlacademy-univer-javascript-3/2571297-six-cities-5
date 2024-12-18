import { Provider } from 'react-redux';
import { store } from '../store';
import { AppRouter } from './app-router';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </Provider>
);

export default App;
