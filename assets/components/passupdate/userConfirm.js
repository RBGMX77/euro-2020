import React, { Component } from 'react';
import Form from '../common/form';
import { ToastContainer , toast } from 'react-toastify';
import Joi from 'joi-browser';
import PassUpdate from './passUpdate';
import axios from 'axios';

class UserConfirm extends Form {
    state = { 
        data : {
            username : ""
            },
    errors : {}, 
    alias : "",
    loading : false,
    buttonText : "Valider",
    userquery : true
    }
    schema = {
        username : Joi.string().required().max(40),
    }
    doSubmit(){
        this.setState({alias : this.state.data.username , buttonText : 'Patientez...'})
        const data = { username : this.state.data.username}  
        axios({
            method: 'POST',
            url: 'api/getUserName',
            data: data,
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        }).then((res) => {
            if(res.data.user === this.state.data.username ){
                this.setState({userquery : false})
            }
            else{
                this.setState({data:{username : ''},errors : {username : ''} , buttonText : "Valider"});
                toast.error('Le nom d\'utilisateur n\'existe pas', this.toastoptions);     
            }
        })
    }
    render() { 
        const { loading , userquery , alias , buttonText } = this.state
        return ( 
            <div>
                <ToastContainer/>
                <h1 className="title">Renouvellement de mot de passe</h1>
                <form onSubmit={this.handleSubmit} className="newpass-form">
                    {this.renderInput('username','Votre nom d\'utilisateur  :','text','input')}
                    {userquery? this.renderButton(buttonText,'button is-success') : null}
                </form>
                {userquery? null : <PassUpdate alias={alias}/>}
            </div>            
        );
    }
}
 
export default UserConfirm;