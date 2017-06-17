import { ACT_FIREBASE } from '../actions/action_login';
import { ACT_FEED } from '../actions/action_feed';


const INITIAL_STATE = { firebase: false, feed: false}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACT_FIREBASE:
      return { ...state, firebase: true }
    case ACT_FEED:
      return { ...state, feed: !state.feed }
    default:
      return state;
  }
}
