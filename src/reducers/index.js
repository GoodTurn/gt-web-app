import { combineReducers } from 'redux';
import feedReducer  from './reducer_feed';
import gtkyKEY from './reducer_gtky';
import Login from './reducer_login_logout';
import {reducer as formReducer} from 'redux-form';
import activated from './activateReducer'


const rootReducer = combineReducers({
  appActivated: activated,
  form: formReducer,
  profiles: feedReducer,
  gtkyKEY: gtkyKEY,
  login: Login
});

export default rootReducer;
