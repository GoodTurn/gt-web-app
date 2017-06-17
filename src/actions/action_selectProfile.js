export const SELECT_PROFILE = 'SELECT_PROFILE';

export function selectProfile(profile) {
  return {
    type: SELECT_PROFILE,
    payload: profile,
  };
};
