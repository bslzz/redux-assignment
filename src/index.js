import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { 
  createStore, 
  applyMiddleware, 
  compose 
} from 'redux';
import { Provider } from 'react-redux'; 
import rootReducers from './store/reducers/rootReducers';
import thunk from 'redux-thunk' 
import { createFirestoreInstance, getFirestore, reduxFirestore  } from 'redux-firestore' 
import { ReactReduxFirebaseProvider, getFirebase  } from 'react-redux-firebase' 
import firebase from 'firebase/app' 
import { FIREBASE_CONFIG as firebaseConfig } from './config/firebaseConfig' 

const store = createStore(
  rootReducers,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })), 
    reduxFirestore(firebase, firebaseConfig) 
  )
);

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider 
      firebase={firebase} 
      config={firebaseConfig} 
      dispatch={store.dispatch} 
      createFirestoreInstance={createFirestoreInstance} 
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
