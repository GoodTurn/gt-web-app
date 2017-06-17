import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { logItIn, loginAction, signUpAction, activate } from '../actions/action_login.js';
import { config } from '../../config';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
      error: ''
    };
    this.loginSwitch = this.loginSwitch.bind(this);
  }
  componentWillMount() {
    if (!this.props.appActivated.firebase) {
      this.props.activate();
      firebase.initializeApp(config);
    }
  }

  signUp = (values) => {
    this.setState({error: ''})
    const badValidation = this.validateSignUp(values.firstName, values.lastName, values.email, values.password);
    if (badValidation) {
      this.setState({error: badValidation});
    } else {
      this.props.loginAction();
      this.props.signUpAction(values);
    }
  }

  validateSignUp = (firstName, lastName, email, password) => {
    const fields = [firstName, lastName, email, password];
    let encoded = '';
    for (var i = 0; i < fields.length; i++) {
      if (fields[i] === "") {
        return 'Please do not leave fields blank';
      }
      encoded = encodeURI(fields[i]);
      fields[i] = fields[i].replace(/ /g,"%20");
      if (fields[i] !== encoded) {
        for (var j = 0; j < fields[i].length; j++) {
          if (fields[i][j] !== encoded[j]) {
            return `Invalid character ${fields[i][j]}`;
          }
        }
      }
    }

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email)) {
      return 'Please enter a valid email';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    return false;
  }

  login = (values) => {
    this.setState({error: ''});
    const badValidation = this.validateLogin(values.email, values.password);
    if (badValidation) {
      this.setState({error: badValidation});
    } else {
      this.props.loginAction();
      this.props.logItIn(values.email, values.password);
    }
  }

  validateLogin = (email, password) => {
    const fields = [email, password];
    let encoded = '';
    for (var i = 0; i < fields.length; i++) {
      if (fields[i] === "") {
        return 'Please do not leave fields blank';
      }
      encoded = encodeURI(fields[i]);
      fields[i] = fields[i].replace(/ /g,"%20");
      if (fields[i] !== encoded) {
        for (var j = 0; j < fields[i].length; j++) {
          if (fields[i][j] !== encoded[j]) {
            return `Invalid character ${fields[i][j]}`;
          }
        }
      }
    }

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email)) {
      return 'Please enter a valid email';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    return false;
  }


  loginSwitch () {
    this.setState({ signup: !this.state.signup })
  }


  render() {
    const facebook = false;
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    const { handleSubmit } = this.props;
    if (this.props.login.loggedIn) {
      return (
        <Redirect to={from}/>
      )
    }

    if (this.state.signup) {
      return (
        <div className="login-page">
          <div className="login-carousel">
            <div className="login-carousel-inner">
              <img src="../pics/Carousel/4.jpg" alt="" />
            </div>
          </div>
          <div className="login-sign-up">
            <h3 className="login-sign-up-intro">Sign up to connect with those closest to you...literally!</h3>
            <h3 className="login-sign-up-intro">It's free.</h3>
            { facebook  && <div><button className="login-sign-up-submit" onClick={this.signUp} type="submit">Log in with Facebook</button>
            <div><br /><hr size="1px" color="#ece6e2" width="250px" /><br /></div></div>}
            <form className="login-sign-up-form" onSubmit={handleSubmit(this.signUp)}>
              <Field component="input" className="login-sign-up-field" type="text" placeholder="First Name" name="firstName"  />
              <Field component="input" className="login-sign-up-field" type="text" placeholder="Last Name" name="lastName" />
              <Field component="input" className="login-sign-up-field" type="text" placeholder="Email" name="email" />
              <Field component="input" className="login-sign-up-field" type="password" placeholder="Password" name="password" />
              <p className="login-sign-up-error">{this.state.error}{this.props.login.message}</p>
              <button className="login-sign-up-submit" type="submit">Sign Up</button>
            </form>
            <p>
              Have an account? <a onClick={this.loginSwitch} className="login-login-link">Log In</a>
            </p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="login-page">
          <div className="login-carousel">
            <div className="login-carousel-inner">
              <img src="../pics/Carousel/4.jpg" alt="" />
            </div>
          </div>
          <div className="login-sign-up">
            { facebook  && <div><button className="login-sign-up-submit" onClick={this.signUp} type="submit">Log in with Facebook</button>
            <div><br /><hr size="1px" color="#ece6e2" width="250px" /><br /></div></div> }
            <form className="login-sign-up-form" onSubmit={handleSubmit(this.login)}>
              <Field className="login-sign-up-field" type="email" placeholder="Email" name="email" component="input" />
              <Field className="login-sign-up-field" type="password" placeholder="Password" name="password" component="input" />
              <p className="login-sign-up-error">{this.state.error}{this.props.login.message}</p>
              <button className="login-sign-up-submit" type="submit">Log In</button>
            </form>
            <p>
              Don't have an account? <a onClick={this.loginSwitch} className="login-login-link">Sign Up</a>
            </p>
          </div>
        </div>
      )
    }

  }
}

function mapStateToProps(store) {
  return {
    login: store.login,
    appActivated: store.appActivated,
    loginForm: store.form,
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  };
}

Login = reduxForm({
  form: 'loginForm'
})(Login);

Login = connect(mapStateToProps, { loginAction, signUpAction, logItIn, activate })(Login);

export default Login;
