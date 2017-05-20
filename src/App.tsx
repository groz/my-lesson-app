import * as React from 'react';
import './App.css';
import {Calculator} from './components/Calculator';

const logo = require('./logo.svg');

class App extends React.Component<{}, null> {
  render() {
    return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h2>Welcome to React</h2>
          </div>

          <Calculator/>

        </div>
    );
  }
}

export default App;
