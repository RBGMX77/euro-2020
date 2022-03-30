import React, { Component } from 'react';
import axios from 'axios';
import Loader from './common/Loader';
import { Link } from 'react-router-dom';

class Account extends Component {

    state = { 
        loading : true,
        id: localStorage.getItem('id'),
        username : "",
        bets : []
    };
    componentDidMount(){
        this.getUserById()
    };
    getUserById(){
        const id = Number(this.state.id);
        const data = { id : id};
        axios({
            method: 'POST',
            url: 'api/user/getUserById',
            data: data,
            headers: {'X-Requested-With': 'XMLHttpRequest'}     
        }).then(res => {
            this.setState({username:res.data})
        });
        axios({
            method: 'POST',
            url: 'api/getbetsByUser',
            data: data,
            headers: {'X-Requested-With': 'XMLHttpRequest'}     
        }).then(res => {
            this.setState({bets : res.data , loading : false})
        })
    };

    render() { 
        const {username , loading , bets} = this.state
        return (     
            <React.Fragment>
                <h2 className="title is-2">Mon Compte</h2>
                {loading? <Loader/>:
                <div className="account">
                    <p>Mon espace</p> 
                    <em className="username">{username.toUpperCase()}</em>
                    <hr></hr>
                    <h6 className="title is-6">Mes pronos :</h6>
                    <table className="table">
                    {bets.length > 0 ? 
                    <React.Fragment>
                        <thead>
                            <tr>
                                <th>Date du prono</th>
                                <th>Match</th>
                                <th>Mon pronostic</th>
                                <th>Résultat du match</th>
                                <th>Statut du prono</th>
                            </tr>
                        </thead>
                        <tbody>
                        {bets.map(bet => 
                            <tr key={bet.match_id}>
                                <td>{bet.bet_date.date.slice(0,10).split('-').reverse().join('/')}</td>
                                <td>
                                    <img 
                                        src={`/images/${bet.hometeam}.svg`} 
                                        width="25px"
                                        className="homeimage"
                                        />
                                        {bet.hometeam} - {bet.awayteam}
                                        <img 
                                        src={`/images/${bet.awayteam}.svg`} 
                                        width="25px"
                                        className="awayimage"
                                        />
                                </td>
                                <td>{bet.homescore} - {bet.awayscore}</td>
                                <td>Match à venir</td>
                                <td>Match à venir</td>
                            </tr>
                        )}
                        </tbody>
                    </React.Fragment> :
                    <div>
                        <p>Vous n'avez pas encore placé de pronostics.</p>
                        <p>Revenez vers les <Link to="/matches">matches</Link> pour commencer à pronostiquer.</p>
                    </div>
                    }
                    </table>
                </div>
                }
            </React.Fragment>
         );
    }
}
 
export default Account;