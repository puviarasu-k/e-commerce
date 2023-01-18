import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'redux';
import "./index.css"

const initialState = {
  username: '',
  id: '',
  data: [],
  index : 0
}
const reducer = (state = initialState, action) => {
  console.log('reducer called');
  if (action.type === 'SETDETAILS') {
    return {
      username: action.payload.username,
      id: action.payload.id
    }
  }
  else if (action.type === 'SETVAR') {
    return {
      data : action.payload.data,
      index: action.payload.id
    }

  }

  return state;
};

const store = configureStore({ reducer });

store.subscribe(() => {
  console.log('current state', store.getState());
});

// store.dispatch({
//   type: 'INCREMENT'
// });

// store.dispatch({
//   type: 'INCREMENT'
// });

// store.dispatch({
//   type: 'DECREMENT'
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <App />
  </React.StrictMode>
);

export { store };
