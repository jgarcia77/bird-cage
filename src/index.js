import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'mobx-react';
import BirdStore from './stores/BirdStore';
import WeatherStore from './stores/WeatherStore';

const Root = (
    <Provider 
        BirdStore={BirdStore} 
        WeatherStore={WeatherStore}>
        <App></App>
    </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));
registerServiceWorker();
