import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';

class Access extends Form {
    state = { 
        data : { pass : "" },
        errors : {}
    };
    schema = {
        pass : Joi.string().required().min(11).max(13)
    };
    doSubmit(){
        const correctPass = 'pass12345678';
        const pass = this.state.data.pass
        if (pass == correctPass){
            sessionStorage.setItem('access','ok');
            document.location.href="/home";
        }
    }
    render() { 
        return ( 
            <form className="access" onSubmit={this.handleSubmit}>
                <h1 className="title">Page en construction</h1>
                <img src="images/working.gif"/>
                {this.renderInput('pass','Code d\'accès :','text','input')}
                {this.renderButton('Valider','button is-success')}
            </form>
         );
    }
}
 
export default Access;