import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Room from "./pages/room";
import Home from './pages/home'


function App() {

  return (
    <BrowserRouter>
    <Switch>
      <Route path = "/" exact component = {Home}/>
      <Route path = "/room" component = {Room}/>
    </Switch>
    </BrowserRouter>
  );
};

export default App;



