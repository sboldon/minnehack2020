import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TestApi from './pages/TestApi';
import Error404 from './pages/Error404';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route path="/" exact component={TestApi} />
          <Route path="*" component={Error404} />
        </Switch>
      </div>
    </Router>
  );
}