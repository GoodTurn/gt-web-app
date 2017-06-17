export const LOGIN = 'LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const LOGOUT = 'LOGOUT';
export const ACT_FIREBASE = 'ACT_FIREBASE';
export const GET_LOCATION = 'GET_LOCATION';
import { getFeed } from './action_feed';
import { API_KEY } from '../../config';

import axios from 'axios';
import firebase from 'firebase';

export function getLocation(id) {
  return (dispatch) => {
    const url = 'https://www.googleapis.com/geolocation/v1/geolocate?key=' + API_KEY
    axios.post(url)
      .then((location) => {
        const lat = location.data.location.lat;
        const long = location.data.location.lng;
        getFeed(dispatch, lat, long, id)
        const url2 = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=' + API_KEY
        axios.get(url2)
          .then((response) => {
            return dispatch({
              type: GET_LOCATION,
              payload: response
            });
          })
      })
  }
}

export function activate() {
  return {
    type: ACT_FIREBASE
  }
}

export function loginAction() {
  return {
    type: LOGIN_ACTION
  };
}

export function logItIn(email, password) {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      history.replaceState({state: undefined}, 'GoodTurn', '/');
      history.pushState({state: undefined}, 'GoodTurn', '/');
      const request = axios.get('/profile/' + email + '/');
      loginSucess(dispatch, request);
    })
    .catch((err) => {
      loginFail(dispatch)
    });
  }
}

export function loginFail(dispatch) {
  return dispatch({ type: LOGIN_ERROR });
}

export function loginSucess(dispatch, request) {
  return dispatch({
    type: LOGIN,
    payload: request
  })
}

export function signUpAction(values) {
  const { email, password } = values;
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        history.replaceState({state: undefined}, 'GoodTurn', '/');
        history.pushState({state: undefined}, 'GoodTurn', '/');
        const request = axios.post('/profile/',{ values: values });
        loginSucess(dispatch, request)
      })
      .catch((err) => {
        loginFail(dispatch)
      });
  }
}

export function logItOut(dispatch){
  return dispatch({
    type: LOGOUT
  });
}

export function logoutAction() {
  return (dispatch) => {
    firebase.auth().signOut();
    logItOut(dispatch)
  }
}
