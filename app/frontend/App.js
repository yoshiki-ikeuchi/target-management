// エントリポイント
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Page components
import Login from "./pages/login";
import Menu from "./pages/menu";
import Users from "./pages/users";
import UserForm from "./pages/users/UserForm";
import UserFormAdd from "./pages/users/UserFormAdd";
import Items from "./pages/items";

import Cars from "./pages/cars";
import CarsCreate from "./pages/cars/CarsCreate";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/new" >
          <UserFormAdd pageMode="new" />
        </Route>
        <Route exact path="/users/new/edit" >
          <UserFormAdd pageMode="new" />
        </Route>              
        <Route exact path="/users/:id" >
          <UserForm pageMode="show" />
        </Route>
        <Route exact path="/users/:id/edit" >
          <UserForm pageMode="edit" />
        </Route>
        <Route exact path="/items" component={Items} />

        <Route exact path="/cars" component={Cars} />
        <Route exact path="/carsCreate" >
          <CarsCreate pageMode="edit" />
        </Route>  
        <Route exact path="/carsCreate/edit" >
          <CarsCreate pageMode="edit" />
        </Route>  
      </Switch>
    </BrowserRouter>
  );
}

// このDOMに差し込みます
const app = document.getElementById('app');
ReactDOM.render(<App />, app);
