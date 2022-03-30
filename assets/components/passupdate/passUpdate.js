import React from 'react';
import Form from './../common/form';
import { ToastContainer , toast } from 'react-toastify';
import Joi from 'joi-browser';
import axios from 'axios';

class PassUpdate extends Form {
    state = { 
        data : {
            password : ""
        },
        errors : {}, 
        loading : false,
        buttonText : "Valider"
    }
    schema = {
        password : Joi.string().required().min(8).max(25),
    }
    doSubmit(){
        console.log(this.state.data.password);
        this.setState({password : this.state.data.password , loading : true , buttonText : 'Patientez....'});
        const data = { user : this.props.alias, password : this.state.data.password}
        axios({
            method: 'POST',
            url: 'api/user/updatePassword',
            data: data,
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        }).then((res) => {
            toast.success('Mot de passe modifié avec succès !', this.toastoptions);
            setTimeout( () => {document.location.href="/login" },2100)
        })
    }
    render() { 
        const {loading,buttonText} = this.state
        return ( 
            <form onSubmit={this.handleSubmit} className="newpass-form">
                {this.renderInput('password','Nouveau mot de passe  :','text','input')}
                {this.renderButton(buttonText,'button is-success')}
            </form>
         );
    }
}
 
export default PassUpdate ;