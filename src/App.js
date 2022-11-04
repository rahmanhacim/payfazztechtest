import React from "react";
import TableListPage from "./TableList";
import TransactionDetailPage from "./TransactionDetail";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Switch>
          <Route exact path="/:id" component={TransactionDetailPage}></Route>
          <Route exact path="/" component={TableListPage}></Route>
        </Switch>
    </div>
    </BrowserRouter>
  );
}