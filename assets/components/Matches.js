import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import Bets from './Bets';
import Filter from './Filter';
import Pagination from './common/pagination';
import { paginate } from '../utilities/paginate';


class Matches extends Component {

    state = { 
        matches : [],
        selectedMatches : [],
        groups: [], 
        selectedGroup : '',
        dates : [] ,
        selectedDate : '',
        teams : [],
        selectedTeam : '',
        currentPage : 1 ,
        pageSize : 6,
        date : new Date('d-M-Y')
    };

    componentDidMount(){
        this.getMatches();
    }

    getMatches() {        
        axios.get(`https://portfolio-72147-default-rtdb.europe-west1.firebasedatabase.app/matches.json`).then(res => {
            const matches = res.data.slice(0,36);
            const dates = [];
            const teams = [];
            const groups = [];
            matches.map( m => {
                if (!dates.includes(m.date)) dates.push(m.date);
                if (!teams.includes(m.hometeam)) teams.push(m.hometeam);
                if (!groups.includes(m.group)) groups.push(m.group);
            });
            this.setState({ matches , teams : teams.sort() , dates , groups , selectedMatches : matches })
        });
    }
    handlePageChange = (page) => {
        this.setState({ currentPage : page});
    };
    handleGroupFilter = (group) => {
        const matches = [...this.state.matches];
        if (group === 'All'){
            this.setState({ selectedMatches : matches , selectedGroup :''});
        }  
        else{
            const selectedMatches = matches.filter( m => m.group === group);
            this.setState({selectedMatches , selectedGroup : group , selectedTeam : '' , selectedDate : '' , currentPage: 1});
        }  
    };
    handleDateFilter = (date) => {
        const matches = [...this.state.matches];
        if (date === 'All'){
            this.setState({ selectedMatches : matches , selectedDate :''})
        }      
        else{
            const selectedMatches = matches.filter( m => m.date === date);
            this.setState({selectedMatches , selectedDate : date , selectedTeam : '' , selectedGroup : '', currentPage: 1});
        }  
    };
    handleTeamFilter = (team) => {
        const matches = [...this.state.matches];
        if (team === 'All'){
            this.setState({ selectedMatches : matches , selectedTeam : '', currentPage: 1})
        }      
        else{
            const selectedMatches = matches.filter( m => m.hometeam === team || m.awayteam === team);
            this.setState({selectedMatches , selectedTeam : team , selectedDate : '' , selectedGroup : ''});
        }  
    };
    getPagedData = () => {
        const { pageSize, currentPage, selectedMatches} = this.state;
        const matchListPerPage = paginate(selectedMatches,currentPage,pageSize);
        return { totalCount: selectedMatches.length, data: matchListPerPage}
    }
    previousPage = () => {
        let {currentPage} = this.state
        if (currentPage >1 ){
            currentPage--
        }
        this.setState({currentPage})
    }    
    nextPage = () => {
        let {currentPage,selectedMatches,pageSize} = this.state
        if (currentPage < Math.ceil(selectedMatches.length / pageSize) ){
            currentPage++
        }
        this.setState({currentPage})
    }    
    render() {
        const { pageSize , currentPage, selectedMatches , selectedGroup, selectedDate , selectedTeam , dates ,  groups , teams } = this.state;
        const { totalCount , data } = this.getPagedData();
        return (
            <div className="matchescontent">
                <h1 className="title">Phase de Groupe</h1><hr/>
                <div className="dropdown is-hoverable">
                    <Filter 
                        label={'Groupe '}
                        items={groups} 
                        selectedItem={selectedGroup}
                        onItemSelect={this.handleGroupFilter}
                    />
                </div>
                <div className="dropdown is-hoverable">
                    <Filter 
                        label={'Date '}
                        items={dates} 
                        selectedItem={selectedDate}
                        onItemSelect={this.handleDateFilter}
                    />
                </div>
                <div className="dropdown is-hoverable">
                    <Filter 
                        label={'Equipe '}
                        items={teams} 
                        selectedItem={selectedTeam}
                        onItemSelect={this.handleTeamFilter}
                    />
                </div>
                <div className="matches">
                    {data.map(match =>
                    <Bets match={match} key={match._id}/>
                    )}
                </div>
                <div className="pagination">
                    <Pagination 
                        itemsCount={totalCount} 
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                        previousPage={this.previousPage}
                        nextPage={this.nextPage}
                    />
                </div>
            </div>           
        )
    }
}
 
export default Matches;