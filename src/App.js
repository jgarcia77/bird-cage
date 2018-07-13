import React, { Component } from 'react';
import './App.css';
import { inject, observer } from 'mobx-react';
import JSONPretty from 'react-json-pretty';

class App extends Component {
  BirdStore = this.props.BirdStore;
  WeatherStore = this.props.WeatherStore;

  handleSubmit = (e) => {
    e.preventDefault();
    const bird = this.bird.value;
    this.props.BirdStore.addBird(bird);
    this.bird.value = '';
  }

  componentDidMount() {
      this.WeatherStore.loadWeatherGenerator('Dallas');
  }

  render() {
        
    return (
      <div className="App">
        <h2>You have {this.BirdStore.birdCount} birds.</h2>

        <form onSubmit={e => this.handleSubmit(e)}>
          <input type="text" placeholder="Enter Birds" ref={input => this.bird = input} />
          <button>Add Bird</button>
        </form>

        <ul>
          {this.BirdStore.birds.map(bird => (
            <li key={bird}>{bird}</li>
          ))}
        </ul>

        <JSONPretty json={this.WeatherStore.weatherData} />

      </div>
    );
  }
}

export default inject('BirdStore', 'WeatherStore')(observer(App));
