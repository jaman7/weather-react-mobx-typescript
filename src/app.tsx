import { inject, observer } from 'mobx-react';
import SearchCity from './components/searchCity';
import Result from './components/result';
import './assets/scss/main.scss';
import React from 'react';
import { IWeatherStoreProps } from './interfaces/interfaces';

@inject('WeatherStore')
@observer
class App extends React.Component<IWeatherStoreProps> {
  async componentDidMount() {
    const { WeatherStore } = this.props || {};
    WeatherStore?.retrieve?.();
  }

  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col px-0">
              <SearchCity />
            </div>
          </div>
        </div>
        <div className="container-fluid bg">
          <Result />
        </div>
      </>
    );
  }
}

export default App;
