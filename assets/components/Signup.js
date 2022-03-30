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
                email : ""
            },
        errors : {},
        loading : false,
        buttonText : "Valider"
        }

    schema = {
        username : Joi.string().required().max(40),
        password : Joi.string().required().min(8).max(25),
        email : Joi.string().required().email()
    }
    doSubmit = () => {
        this.setState({loading:true , buttonText: "Chargement..."})
        const data = {
            username : this.state.data.username,
            password : this.state.data.password,
            email : this.state.data.email
        }
        axios({
            method: 'POST',
            url: 'api/user/new',
            data: data,
            headers: {'X-Requested-With': 'XMLHttpRequest'}     
        })
        .then((res) => {
            this.setState({loading:false , buttonText : "Valider"})
            if (res.status === 200){
            console.log(res);
            toast.success(res.data.message, this.toastoptions);
            setTimeout(() => { this.props.history.push('/login')},3500)}
        })
        .catch((err) => {
            this.setState({loading:false, buttonText : "Valider"})
            toast.error('Le nom d\'utilisateur est déja utilisé', this.toastoptions);
        })
    }
    render() { 
        const { loading } = this.state
        return ( 
            <div>
                <ToastContainer/>
                {loading === true ? <UserLoader/> : null }
                <h1 className="title">Créer un nouveau compte</h1>
                <h2>Vous avez déja un compte? Cliquez <Link to="login">ici</Link> pour vous connecter</h2>
                <form onSubmit={this.handleSubmit} className="signup-form">
                    {this.renderInput('username','Choisir un Nom d\'utilisateur  :','text','input')}
                    {this.renderInput('email','Renseigner une adresse Email  :','text','input')}
                    {this.renderInput('password','Créer un Mot de passe  :','password','input')}
                    <div className="field is-grouped">
                        {this.renderButton('Valider','button is-success')}
                        <Link to="/home" className="button is-info">Annuler</Link>
                    </div>
                </form>
            </div>            
        );
    }
}
 
export default Signup;