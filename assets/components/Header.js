import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Header extends Component {

    state = {
        connected : localStorage.getItem('connected')
    }
    onLogout(){
        localStorage.setItem('connected','false');
        localStorage.removeItem('id');
        window.location.replace('/api/logout');
    };
    render(){
        const {connected} = this.state;
        return ( 
            <header className="header">
                <nav className="navbar">
                    <div className="navbar-brand">
                        <Link to="/home"><img src="/images/euro2020-logo.svg" width="45"></img></Link>
                        {/* <a className="navbar-burger" role="button">
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                        <Link to="/matches" className="navbar-item">Matches</Link>
                        <Link to="/ranking" className="navbar-item">Classement</Link>
                        <Link to="#" className="navbar-item">A venir</Link> */}
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-start">
                            <div className="navbar-item has-dropdown is-hoverable">
                                <div className="navbar-item">Matches</div>
                                <div className="navbar-dropdown">
                                    <Link to="/matches" className="navbar-item">Phase de Groupe</Link>
                                    {/* <Link to="/#" className="navbar-item">Phase finale</Link> */}
                                </div>
                            </div>
                            <Link to="/ranking" className="navbar-item">Classement</Link>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            {connected==='true'?
                            <div className="buttons">
                                <Link to="/account" className="button is-primary">Mon compte</Link>
                                <button onClick={this.onLogout}  className="button is-warning">Déconnection</button>
                            </div>
                            :
                            <div className="buttons">
                                <Link to="/login" className="button is-primary">Connection</Link>
                                <Link to="/signup" className="button is-info"><strong>Créer un compte</strong></Link>
                            </div>
                            }
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
    
}
 
export default Header;