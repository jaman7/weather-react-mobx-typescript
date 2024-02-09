import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import { Provider } from 'mobx-react';
import WeatherStore from './stores/weatherStore.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider WeatherStore={WeatherStore}>
    <App />
  </Provider>
);
