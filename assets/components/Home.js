import React, {Component} from 'react';
import axios from 'axios';
import ComingMatches from './ComingMatches';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

class Home extends Component {

    state = { matches : [] }
    
    componentDidMount(){
        this.getMatches();
        const connected = localStorage.getItem('connected');
        if (connected === 'true') this.getUser();
    };
    getUser(){
        axios.get('api/getUserId').then(res => {
            localStorage.setItem('id',res.data);
        });
    };
    getMatches(){
        axios.get(`https://portfolio-72147-default-rtdb.europe-west1.firebasedatabase.app/matches.json`).then(res => {
            let matches = [];
            for (let i = 0 ; i < res.data.length ; i++){
                if (res.data[i].homescore === ""){
                    matches.push(res.data[i]);
                }
            }
            this.setState({matches : matches.slice(0,4)}) 
        });
    }
    render() {
        const {matches} = this.state
        return (
            <section className="headerimg">
                <img src="/images/euro2020-logo.svg"/>                
                <ComingMatches data={matches}/>
                <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="equipedefrance"
                    options={{height: 500 , width : 300}}
                    lang="fr"
                />                
            </section>           
        )
    }
}
    
export default Home;