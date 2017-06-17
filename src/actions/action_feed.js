export const GET_FEED = 'GET_FEED';
export const ACT_FEED = 'ACT_FEED';
export const SEARCH_FILTER = 'SEARCH_FILTER';
export const REMOVE_FEED = 'REMOVE_FEED';
import axios from 'axios';





export function activate() {
  return {
    type: ACT_FEED
  }
}

export function getFeed(dispatch, lat, long, id) {
  // RETURN AXIOS AJAX REQUEST //
  const url = '/feed/' + id;
  const request = axios.put(url, {
    latitude: lat,
    longitude: long
  });

  return dispatch({
    type: GET_FEED,
    payload: request
  })
}

export function search(term) {
  return {
    type: SEARCH_FILTER,
    payload: term,
  }
}

export function removeFeed() {
  return {
    type: REMOVE_FEED
  }
}
