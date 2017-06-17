import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { HashRouter as Router, Route } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers/index';

// components
import Header from './containers/header';

// ROUTES
import App from './containers/App';
import Login from './containers/login';
import UserProfile from './containers/userProfile';
import UserProfileEdit from './containers/userProfileEdit';
import About from './components/about';
import Help from './containers/help';
import UserProfilePic from './containers/UserProfilePic';


const middleware = applyMiddleware(ReduxThunk, ReduxPromise);
const store = createStore(reducers, middleware);

function removeDropDown() {
  document.getElementById("myDropdown").classList.remove("show");
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <main>
          <Header />
          <div className="below-nav" onClick={removeDropDown}>
            <Route path='/' exact={true} component={App} />
            <Route path='/login' component={Login} />
            <Route path='/profile' component={UserProfile} />
            <Route path='/edit' component={UserProfileEdit} />
            <Route path='/picture' component={UserProfilePic} />
            <Route path="/about" component={About} />
            <Route path="/help" component={Help} />
        </div>
      </main>
    </Router>
  </Provider>
  , document.getElementById('app')
);
