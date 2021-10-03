import React from 'react';
import './App.css';
import Main from "./Components/Main/Main"

import { Store } from "redux"

import { ApplicationState } from './redux/store';
import { Provider } from 'react-redux';


interface MainProps {
  store: Store<ApplicationState>;
}

const App: React.FC<MainProps> = ({ store }) => {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="btn btn-primary"> HELLO WORLD </div>
        <Main></Main>
      </div>
    </Provider>
  );
}

export default App;
