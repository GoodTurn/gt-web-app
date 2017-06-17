export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
import axios from 'axios';
import firebase from 'firebase';


export function deleteAccount(id) {
  const user = firebase.auth().currentUser;
  user.delete();
  const request = axios.delete('/profile/' + id);

  return {
    type: DELETE_ACCOUNT,
    payload: request
  }
}
