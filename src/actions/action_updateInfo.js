export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_FAIL = 'UPDATE_FAIL';
export const CHANGE_EDITED = 'CHANGE_EDITED';
export const MESSAGE_CLEAR = 'MESSAGE_CLEAR';
export const UPDATE_PIC = 'UPDATE_PIC';
import axios from 'axios';

export function changeEditStatus() {
  return {
    type: CHANGE_EDITED
  }
}

export function updateInfo(values) {
  // RETURN AXIOS AJAX REQUEST //
  return (dispatch) => {
    axios.put('/profile/' + values.profileid + '/' , { values })
      .then((user) => {
        updateSuccess(dispatch, user);
      })
      .catch(() => {
        updateFail(dispatch);
      });
  }
}

export function updatePic(newImage, id) {
  return (dispatch) => {
    axios.put('/newimage/', { newImage, id })
      .then((user) => {
        return dispatch({
          type: UPDATE_PIC,
          payload: user
        })
      })
      .catch(() => updateFail(dispatch));
  }
}

export function updateSuccess(dispatch, user) {
  return dispatch({
    type: UPDATE_SUCCESS,
    payload: user
  })
}

export function updateFail(dispatch) {
  return dispatch({
    type: UPDATE_FAIL
  })
}

export function messageClear() {
  return {
    type: MESSAGE_CLEAR
  }
}
