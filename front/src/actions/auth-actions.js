import superagent from 'superagent';
import { deleteCookie } from '../utils/cookie';

const setToken = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

const removeToken = () => ({
  type: 'TOKEN_REMOVE',
});

const logout = () => {
  deleteCookie('travel-token');
  return removeToken();
};

const signupRequest = user => (store) => {
  return superagent.post(`${API_URL}/signup`)
    .send(user)
    .withCredentials()
    .then((res) => {
      return store.dispatch(setToken(res.text));
    });
};

const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}/login`)
    .auth(user.username, user.password)
    .withCredentials()
    .then((res) => {
      return store.dispatch(setToken(res.text));
    });
};

export { 
  setToken, removeToken, logout, signupRequest, loginRequest, 
};
