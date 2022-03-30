import React from 'react';
import Joi from 'joi-browser';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Form from './common/form';
import UserLoader from './common/userloader';

class Signup extends Form {
    state = { 
        data : {
                username : "",
                password : "",
            },
        errors : {},
        errorscount : 0,
        loading : false,
        buttonText : "Valider"
        }
        
    schema = {
        username : Joi.string().required().max(40),
        password : Joi.string().required().min(8).max(25)
    }
    doSubmit = () => {
        this.setState({loading : true , buttonText : "Chargement..."})
        const data = {
            username : this.state.data.username,
            password : this.state.data.password,
        }
        axios({
            method: 'POST',
            url: 'api/login',
            data: data,
            headers: {'X-Requested-With': 'XMLHttpRequest'}     
        })
        .then((res) => {
            this.setState({loading:false , buttonText : "Valider"})
            if (res.status === 200){
            toast.success('Connection réussie!', this.toastoptions);
            localStorage.setItem('connected','true')
            setTimeout( () => {document.location.href="/home" },2100) 
            }            
        })
        .catch((err) => {
            this.setState({loading:false , buttonText : "Chargement..."})
            toast.error('Vérifiez vos identifiants', this.toastoptions);
            let errorscount = this.state.errorscount;
            errorscount++
            this.setState({errorscount:errorscount , data : { username : "" , password : ""} , buttonText :"Valider"})
        })
    }
    render() { 
        const {errorscount, loading , buttonText } = this.state
        return ( 
            <div>
                <ToastContainer/>
                {loading === true ? <UserLoader/> : null}
                <h1 className="title">Connection</h1>
                <h2>Pas de compte? Cliquez <Link to="signup">ici</Link> pour en créer un.</h2>
                <form onSubmit={this.handleSubmit} className="signup-form">
                    {this.renderInput('username','Nom d\'utilisateur :','text','input')}
                    {this.renderInput('password','Mot de passe :','password','input')}
                    {errorscount >= 3 ? <div>Vous avez oublié votre mot de passe ? Cliquez <Link to="/newpassword">ici</Link> pour le réinitlaiiser</div> : null}
                    <div className="field is-grouped">
                        {this.renderButton(buttonText,'button is-success')}
                        <Link to="/home" className="button is-info">Annuler</Link>
                    </div>
                </form>
            </div>            
        );
    }
}
 
export default Signup;