import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import base from './models/base';
import Error404 from './pages/Error404';
import Maps from './pages/Map';
import Login from './pages/Login';
import AuthRequired from './pages/AuthRequired';

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

  // handleSuccess(login) {
  //  this.setState({success: login});
  //}

  LoggedOut() {
    return (
      <Switch>
        <Route
          path="/"
          render={props => (
            <Login {...props} handleSuccess={this.handleSuccess} />
          )}
        />
        <Route path="*" component={AuthRequired} />
      </Switch>
    );
  }

  LoggedIn() {
    return (
      <Switch>
        <Route path="/" exact component={Maps} />
        <Route path="*" component={Error404} />
      </Switch>
    );
  }

  render() {
    return (
      <Router>
        <div className="app-container">
          {this.state.success ? this.LoggedIn() : this.LoggedOut()}
        </div>
      </Router>
    );
  }
}
