import React , {Component} from 'react';
import Loader from './common/Loader';
import Joi from 'joi-browser';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer } from 'react-toastify';

class Bets extends Component {
    state = {
        hidden : true,
        data : {
            homeresult : " ",
            awayresult : " "
        },
        errors: {},
        betstatus : false,
        toast : false, 
        loading : true,
        connected : localStorage.getItem('connected'),
    };
    source = axios.CancelToken.source();
    schema = {
        homeresult : Joi.number().required(),
        awayresult : Joi.number().required()
    };
    componentDidMount(){
        this.getBets();
    };
    componentWillUnmount() {
        if (this.source) {
          this.source.cancel();
        }
    }
    getBets(){
        if (this.state.connected === 'true'){
        const data = { userid : Number(localStorage.getItem('id')) , matchid : this.props.match._id};
        axios({ method : 'POST' , url: 'api/getbets', data : data , headers: {'X-Requested-With': 'XMLHttpRequest'} , cancelToken: this.source.token
        }).then((res) => {
            if (res.data.homescore){
                this.setState({ data : { homeresult : res.data.homescore , awayresult : res.data.awayscore }, loading : false , betstatus : true})
            }
            else {
                this.setState({ data : { homeresult : '' , awayresult : '' }, loading : false})
            }
        })}
        else{
            this.setState({ loading : false })
        }
    };
    validate = () => {
        const options = {abortEarly : false};
        const {error} = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;
        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message; 
        return errors;
    };
    handleChange = ({currentTarget : input}) => {
        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data});
    };
    handleClick = () => {
        this.setState({hidden:false})
    };
    handleSubmit = (e) => {
        e.preventDefault(); 
        const errors = this.validate();
        this.setState({ errors : errors || {}});
        if (errors) return;  
        this.doSubmit();
    };
    doSubmit = () => {
        const data = {
            homescore : this.state.data.homeresult,
            awayscore : this.state.data.awayresult,
            matchid : this.props.match._id,
            betid : uuidv4(),
            hometeam : this.props.match.hometeam,
            awayteam :  this.props.match.awayteam
            }
        if (this.state.betstatus === false){
            axios(
                {method: 'POST', url: 'api/postbets', data: data, headers: {'X-Requested-With': 'XMLHttpRequest'}})
            .then((res) => {
                if (res.status === 200){
                    this.setState({ 
                        hidden : true , 
                        data : {
                            homeresult : "",
                            awayresult : ""
                        }, 
                        betstatus : true,
                        toast : true
                    }); 
                    toast.success('Pronostic validé!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        closeButton: false,
                    });
                    setTimeout(() => { document.location.href="/matches" },3200);
                };             
            })
            .catch((err) => {
                toast.error('Veuillez réessayer', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    closeButton: false,
                });
                setTimeout(() => { this.setState({toast : false})},6000);
            });
        }
        else{
            axios({method:'POST',url:'api/updatebets', data:data, headers: {'X-Requested-With': 'XMLHttpRequest'}})
            .then((res)=> {if (res.status === 200){
                this.setState({ 
                    hidden : true , 
                    data : {
                        homeresult : "",
                        awayresult : ""
                    }, 
                    betstatus : true,
                    toast : true
                }); 
                toast.success('Pronostic modifié!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    closeButton: false,
                });
                setTimeout(() => { document.location.href="/matches" },3200);
            }});
        };       
    };

    render(){
        const {hidden, data , errors , inputerrors , betstatus , toast , connected , loading} = this.state;
        const {match} = this.props;
    
        return ( 
            <div className="box">
                {toast? <ToastContainer/> : null}
                
                <h3>{match.date} - {match.time}</h3>
                <h4>Groupe {match.group}</h4>
                <p>{match.location}</p>
                <pre className="matchdetails">
                    <img className="hometeamimg" src={`/images/${match.hometeam}.svg`}/>
                    {match.hometeam} {match.homescore} - {match.awayscore} {match.awayteam}
                    <img className="awayteamimg" src={`/images/${match.awayteam}.svg`}/>
                </pre>
                <div>
                {loading === true ? <Loader/> : 
                <React.Fragment>
                    <button onClick={this.handleClick} className={hidden ? 'button betbutton is-primary' : 'hidden'}>
                        {betstatus? 'Voir ou Modifier votre pari' : "Parier sur ce match"}
                    </button>
                </React.Fragment>
                }
                <div className={hidden ? 'hidden' : 'betgames'}>
                {connected === "true" ?     
                    <form>
                        <em>{match.hometeam} </em>
                        <input 
                            name="homeresult"
                            value={data.homeresult}
                            onChange={this.handleChange}
                            type="text" 
                            className="score homeresult"
                            error={errors["homeresult"]}
                        />
                            <b> - </b> 
                        <input 
                            name="awayresult"
                            value={data.awayresult}
                            onChange={this.handleChange}
                            type="text" 
                            className={inputerrors? 'inputerrors' : 'score'}
                        />
                        <em> {match.awayteam} </em>
                        <button 
                            onClick={this.handleSubmit} 
                            disabled={this.validate()}
                            type="button" 
                            className="button is-danger"
                        >
                            OK
                        </button> 
                    </form>
                    :
                    <p>Vous devez être connecté pour placer un pronostic.</p>
                    }
                    </div>
                </div>
                
            </div>
         );
    }
    
}
 
export default Bets;