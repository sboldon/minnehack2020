import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import base from './models/base';

import SignInPage from './pages/SignInPage';
import EmergencyPage from './pages/EmergencyPage';
import InformationPage from './pages/InformationPage';
import SettingsPage from './pages/SettingsPage';
import Error404Page from './pages/Error404Page';
import AuthRequiredPage from './pages/AuthRequiredPage';
import NavBar from './components/NavBar';
import ThemeProvider from './components/ThemeProvider'

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
        this.setState({success: false})
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
        <Route exact path="/"component={SignInPage} />
        <Route path="/settings" component={AuthRequiredPage} />
        <Route path="*" component={Error404Page} />
      </Switch>
    );
  }

  LoggedIn() {
    return (
      <>
      <NavBar />
      <Switch>
        <Route exact path="/"  component={EmergencyPage} />
        <Route path="/information" component={InformationPage} />
        <Route path="/settings" render={(routeProps) => <SettingsPage {...routeProps}/>} />
        <Route component={Error404Page} />
      </Switch>
      </>
    );
  }

  render() {
    return (
      <Router>
        <ThemeProvider />
        <div className="app-container">
          {this.state.success ? this.LoggedIn() : this.LoggedOut()}
        </div>
      </Router>
    );
  }
}

