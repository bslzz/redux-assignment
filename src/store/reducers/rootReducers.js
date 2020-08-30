import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { combineReducers } from 'redux';

const initialState = {
  posts: [],
  userData: {},
  userActionErr: null,
  loginStatus: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        userActionErr: action.error.code,
      };
    case 'LOGIN_SUCCESS':
      console.log('Login success, state not changed');
      return {
        ...state,
        loginStatus: true,
      };
    default:
      return state;
  }
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHED_POSTS_SUCCESS':
      return {
        ...state,
        posts: action.resp,
      };

    case 'CREATE_NEW_POST':
      console.log('A new post has been added');
      return state;

    case 'CREATE_NEW_POST_FAIL':
      console.log('An error has occurred: ' + action.err.message);
      return {
        ...state,
        userActionErr: action.err.message,
      };

    case 'REMOVE_ALL_POSTS':
      return {
        ...state,
        posts: [],
      };
    default:
      return state;
  }
};

const rootReducers = combineReducers({
  auth: authReducer,
  post: postReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducers;
