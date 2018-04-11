import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Test from './components/Test/Test';
import Store from './components/Store/Store';
import Routes from './components/Route/Route';
import Order from './components/Order/Order';

import MapTesting from './components/MapTest/MapTest';

import './App.css';



class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <nav>
          <Navbar />
        </nav>
        <section>
          <Switch>
            <Route path="/map" exact component={MapTesting} />
            <Route path="/store/order" component={Order} />
            <Route path="/store/:id" component={Routes} />
            <Route path="/store" exact component={Store} />
            <Route path="/test" component={Test} />
            <Route path="/" exact component={Dashboard} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
