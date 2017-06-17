import {
  UPDATE_SUCCESS,
  UPDATE_PIC,
  UPDATE_FAIL,
  CHANGE_EDITED,
  MESSAGE_CLEAR
} from '../actions/action_updateInfo.js'
import { DELETE_ACCOUNT } from '../actions/action_deleteAccount.js'
import {
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  LOGIN_ACTION,
  GET_LOCATION
} from '../actions/action_login.js';

const INITIAL_STATE = {
  loggedIn: false,
  data: {},
  message: '',
  edited: false,
  location: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_ACTION:
      return { ...state, message: '' };
    case LOGIN:
      return { ...state, loggedIn: true, data: action.payload.data };
    case LOGOUT:
      return { ...state, loggedIn: false, message: '' };
    case LOGIN_ERROR:
      return { ...state, message: 'Incorrect email/password' };
    case UPDATE_SUCCESS:
      return { ...state, data: action.payload.data, message: 'Profile saved and updated!', edited: true };
    case UPDATE_PIC:
      return { ...state, data: action.payload.data, message: 'Profile picture saved. Update may take a few minutes.', edited: true };
    case UPDATE_FAIL:
      return { ...state, message: 'Failed to save'};
    case CHANGE_EDITED:
      return { ...state, edited: false }
    case DELETE_ACCOUNT:
      return { ...state, loggedIn: false, data: action.payload, message: '' };
    case MESSAGE_CLEAR:
      return { ...state, message: '', edited: false }
    case GET_LOCATION:
      return { ...state, location: action.payload.data.results[2].formatted_address }
    default:
      return state;
  }
}
