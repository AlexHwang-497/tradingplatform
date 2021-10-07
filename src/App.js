import logo from './logo.svg';
import './App.css';
import {Fragment, useState,useContext} from 'react'
import Dashboard from './components/Dashboard/Dashboard';
import { Switch, Route,Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Layout from './components/layout/Layout';
import AuthPage from './pages/AuthPage';
import UserProfile from './components/Profile/UserProfile'

import AuthContext from './components/store/AuthContext';




function App() {
  const authCtx = useContext(AuthContext)

  
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage/>
        </Route>

        <Route path='/dashboard'>
            <Dashboard />
        </Route>
        {!authCtx.isLoggedIn &&(<Route path='/auth'>
            <AuthPage/>
        </Route>)}

        

        <Route path='/profile'>
            {authCtx.isLoggedIn && <UserProfile/>}
            {!authCtx.isLoggedIn && <Redirect to='/auth'/>}
        </Route>
        <Route path='*'>
          <Redirect to='/'/>
        </Route>
      </Switch>
    </Layout>    
  );
}
export default App;
