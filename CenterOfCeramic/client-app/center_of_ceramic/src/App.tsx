import React from 'react';
import './App.css';
import Main from "./Components/Main/Main"

import { Store } from "redux"

import { ApplicationState } from './redux/store';
import { Provider } from 'react-redux';
import Header from './Components/header/header';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

//import components
//import category components
import CategoryList from "./Components/admin/category/categoryList";
import AddCategory from "./Components/admin/category/addCategory"
import EditCategory from "./Components/admin/category/editCategory"

interface MainProps {
  store: Store<ApplicationState>;
}

const App: React.FC<MainProps> = ({ store }) => {
  return (
    <Router>

      <Provider store={store}>
        <Header></Header>
        <Switch>
          <Route path="/" exact render={() => (<Main />)} />
          <Route path="/category-list" exact render={() => (<CategoryList />)} />
          <Route path="/add-category" exact render={() => (<AddCategory />)} />
          <Route path="/edit-category" exact render={() => (<EditCategory />)} />
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
