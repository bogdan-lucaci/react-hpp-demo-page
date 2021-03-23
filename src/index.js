import React from 'react';
import ReactDOM from 'react-dom';
import './res/index.css';
import App from './App';
import { AppContext } from './AppContextHook';
import Theme from './components/UI/Theme';
import reportWebVitals from './reportWebVitals';
import { ConfirmProvider } from 'material-ui-confirm';

ReactDOM.render(
    <AppContext>
      <Theme>
        <ConfirmProvider>
          <App />
        </ConfirmProvider>
      </Theme>
    </AppContext>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
