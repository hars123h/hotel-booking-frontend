import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 1. Import from React-redux and redux;
//  2. Create user reducer function;
// 3. combine multiple reducers
//4. create redux store 
// 5. Provide Redux store to the entire app
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';





const store = createStore(
  rootReducer,
  composeWithDevTools()
)




ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
