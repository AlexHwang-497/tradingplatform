import logo from './logo.svg';
import './App.css';
import {Fragment, useState} from 'react'
import Dashboard from './components/Dashboard/Dashboard';
import { Switch, Route,Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Layout from './components/layout/Layout';



function App() {
  
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage/>
        </Route>

        <Route path='/dashboard'>
            <Dashboard />
        </Route>
      </Switch>
    </Layout>
    
    
  );
}
export default App;
