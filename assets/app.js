import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './styles/app.css';
import Header from './components/Header'
import Home from './components/Home';
import Matches from './components/Matches';
import Signup from './components/signup';
import Login from './components/Login';
import Account from './components/Account';
import Access from './components/Access';
import Ranking from './components/Ranking';
import UserConfirm from './components/passupdate/userConfirm';
    
ReactDOM.render(

    <Router>
        <Header/>
        <main>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/matches" component={Matches}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/login" component={Login}/>
                <Route path="/newpassword/" component={UserConfirm}/>
                <Route path="/ranking" component={Ranking}/>
                {localStorage.getItem('connected')==='true'?
                    <Route path="/account" component={Account}/>:
                    <Redirect to="/home" />
                }
                <Route path="/" exact >
                    <Redirect to="/home" />
                </Route>
                <Redirect to="/home"/>
            </Switch>
        </main>
        
    </Router>    
    
    ,document.getElementById('root'));