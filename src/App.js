import React, { useState } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Gestion from './components/Gestion'
import Crear from './components/Crear'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Personal from './components/Personal'

function App() {
  const [ token, setToken ] = useState(localStorage.getItem('token'))
  
  if(!token){
    return <Login setToken={setToken}/>
  }

  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={Home}/>
        <Route exact path={"/gestion/:id"} component={Gestion}/>
        <Route exact path={"/crear"} component={Crear}/>
        <Route exact path={"/personal/:id"} component={Personal}/>
        <Route exact component={NotFound}></Route>
      </Switch>
    </Router>
  );
}

export default App;
