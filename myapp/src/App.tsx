import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {AuthContextProvider} from "./context/authContext"
import Room from "./pages/room";
import Home from './pages/home'


function App() {

  return (
    <BrowserRouter>
    <AuthContextProvider>
      
        <Switch>
          <Route path = "/" exact component = {Home}/>
          <Route path = "/room" component = {Room}/>
        </Switch>

    </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;



