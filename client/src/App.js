import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import base from './models/base';
import SignInPage from './pages/SignInPage';
import EmergencyPage from './pages/EmergencyPage';
import Error404Page from './pages/Error404Page';
import AuthRequiredPage from './pages/AuthRequiredPage';

const Theme = createGlobalStyle`
  html,body {
    margin: 0;
    padding: 0;
  }

`

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      account: {},
    };
    //    this.handleSuccess = this.handleSuccess.bind(this);
    this.LoggedOut = this.LoggedOut.bind(this);
    this.checkUserStatus = this.checkUserStatus.bind(this);
  }

  checkUserStatus() {
    base.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({success: true});
        localStorage.setItem('user', user.uid);
      } else {
        localStorage.removeItem('user');
      }
      //      console.log(localStorage);
    });
  }

  componentDidMount() {
    this.checkUserStatus();
  }

  LoggedOut() {
    return (
      <Switch>
        <Route
          path="/"
          component={SignInPage}
        />
        <Route path="*" component={AuthRequiredPage} />
      </Switch>
    );
  }

  LoggedIn() {
    return (
      <Switch>
        <Route path="/" exact component={EmergencyPage} />
        <Route path="*" component={Error404Page} />
      </Switch>
    );
  }

  render() {
    return (
      <Router>
        <Theme />
        <div className="app-container">
          {this.state.success ? this.LoggedIn() : this.LoggedOut()}
        </div>
      </Router>
    );
  }
}
