import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import {PersistGate} from "redux-persist/integration/react"
import {store, persist } from "./Redux/Store";
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'react-overlay-loader/styles.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'



const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
         <App />
      </PersistGate>
    </Provider>
);

reportWebVitals();
