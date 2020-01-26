import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import base from './models/base';
import TestApi from './pages/TestApi';
import Error404 from './pages/Error404';
import Maps from './pages/Map';
import Login from './pages/Login';
import AuthRequired from './pages/AuthRequired';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      success: false,
      account: {}
    }
    this.handleSuccess = this.handleSuccess.bind(this);
    this.LoggedOut = this.LoggedOut.bind(this);
  }

  handleSuccess(login) {
    this.setState({success: login});
    base.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        console.log(user);
        this.setState({uid: user.id})
        localStorage.setItem('user', user.id)
        postUser(uid);
      }
      else {
        this.setState({uid: null})
        localStorage.removeItem('user');
      }
      console.log(localStorage);
    })
  }

  componentDidUpdate() {
  }

  LoggedOut() {
    return (
      <Switch>
        {/* <Route path="/" exact component={Login} handleSuccess={this.handleSuccess} /> */}
        <Route path="/" render={props => <Login {...props} handleSuccess={this.handleSuccess} />} />
        <Route path="*" component={AuthRequired} />
      </Switch>
    )
  }

  LoggedIn() {
    return(
      <Switch>
        <Route path="/" exact component={Maps} />
        <Route path="*" component={Error404} />
      </Switch>
    )
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


