import React, { Component } from 'react';
import Header from './Header';
import './App.css';
import SearcherData from './SearcherData'
import { Switch, Route } from 'react-router-dom'
import News from './News'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
          <main>
              <Switch>
                  <Route exact path='/' component={SearcherData}/>
                  <Route exact path='/News' component={News}/>
              </Switch>
          </main>
      </div>
    );
  }
}

export default App;
