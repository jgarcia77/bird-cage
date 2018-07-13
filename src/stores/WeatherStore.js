import 
{ 
    configure,
    action,
    observable,
    runInAction,
    flow,
    decorate
 } from 'mobx';

configure({ enforceActions: true });

 class WeatherStore {
    weatherData = {};

    loadWeather = city => {
        fetch(`https://abnormal-weather-api.herokuapp.com/cities/search?city=${city}`)
        .then(response => response.json())
        .then(data => {
            this.setData(data);
        });
    }

    setData = data => {
        this.weatherData = data;
    }

    loadWeatherInline = city => {
        fetch(`https://abnormal-weather-api.herokuapp.com/cities/search?city=${city}`)
        .then(response => response.json())
        .then(data => {
            runInAction(() => {
                this.weatherData = data;
            });
        });
    }

    loadWeatherAsync = async city => {
        const response = await fetch(`https://abnormal-weather-api.herokuapp.com/cities/search?city=${city}`);

        const data = await response.json();

        runInAction(() => {
            this.weatherData = data;
        });
    }

    loadWeatherGenerator = flow(function*(city) {
        const response = yield fetch(`https://abnormal-weather-api.herokuapp.com/cities/search?city=${city}`);

        const data = yield response.json();

        this.weatherData = data;
    })
 }

decorate(WeatherStore, {
    weatherData: observable,
    setData: action
});

export default new WeatherStore();