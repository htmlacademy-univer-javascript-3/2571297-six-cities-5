import MainPage from './pages/MainPage';

interface AppProps {
  offersCount: number;
}

const App = (props: AppProps) => {
  const { offersCount } = props;

  return <MainPage offersCount={offersCount} />;
};

export default App;
