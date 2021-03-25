import React from 'react';
import ReactDOM from 'react-dom';
import './res/index.css';
import App from './App';
import { AppContext } from './AppContextHook';
import Theme from './components/UI/Theme';
import reportWebVitals from './reportWebVitals';
import { ConfirmProvider } from 'material-ui-confirm';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

// function onRenderCallback(
//   id, // the "id" prop of the Profiler tree that has just committed
//   phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
//   actualDuration, // time spent rendering the committed update
//   baseDuration, // estimated time to render the entire subtree without memoization
//   startTime, // when React began rendering this update
//   commitTime, // when React committed this update
//   interactions // the Set of interactions belonging to this update
// ) {
//   console.log({
//     id,
//     phase,
//     actualDuration,
//     baseDuration,
//     startTime,
//     commitTime,
//     interactions
//   });
// }

ReactDOM.render(
  // <React.StrictMode>
  <React.Profiler id="MyComponent" /*onRender={onRenderCallback}*/ >
    <AppContext>
      <Theme>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ConfirmProvider>
            <App />
          </ConfirmProvider>
        </MuiPickersUtilsProvider>
      </Theme>
    </AppContext>
  </React.Profiler>
  // {/* </React.StrictMode> */}
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
