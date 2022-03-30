import React, { Component } from 'react';
import axios from 'axios';
import Loader from './common/Loader';

class Ranking extends Component {
    state = { 
        data : {
            users : []
        },
        loading : false
    }
    componentDidMount(){
        this.getUsers()
    }

    getUsers(){
        this.setState({loading:true})
        axios.get('/api/user/getAll').then((res) => 
        this.setState({data : {users : res.data.usernames} , loading : false}))
    }

    render() { 
        const {users} = this.state.data
        const {loading} = this.state
        return ( 
            <div className="table-container">
                {/* {loading? <Loader/> :
                <table className="table">
                    <thead>
                        <tr>
                            <th>Utilisateurs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => 
                        <tr key={user}>
                            <td>{user}</td>
                        </tr>
                        )}
                    </tbody>
                </table>} */}
                    <h1 className="title is-1">Classement à venir!!</h1>
                    <iframe src='https://gfycat.com/ifr/CheeryVagueElkhound' frameBorder='0' scrolling='no' width='640' height='361'></iframe>
                </div>                
         );
    }
}
 
export default Ranking;