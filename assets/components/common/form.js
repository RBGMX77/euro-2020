import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';

class Form extends Component {
    state = { 
        data: {},
        errors: {}
    }
    toastoptions = {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        closeButton: false,
    }
    validate = () => {
        const options = {abortEarly : false};
        const {error} = Joi.validate(this.state.data, this.schema , options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message; 
        return errors;
    };
    validateProperty = ({name,value}) => {
        const obj = { [name] : value};
        const schema = { [name] : this.schema[name]}
        let errorMessage;
        if (Joi.validate(obj,schema).error !== null){
            if ([name][0] === 'username'){            
                const error = Joi.validate(obj,schema).error.details[0].type;
                switch (error) {
                    case 'any.empty':
                        errorMessage = 'Le nom d\'utilisateur doit être renseigné';
                        break;
                    case 'string.max':
                        errorMessage = 'Le nom d\'utilisateur ne peut excéder 40 caractères';
                        break;                    
                }
            }
            if ([name][0] === 'password'){            
                const error = Joi.validate(obj,schema).error.details[0].type;
                switch (error) {
                    case 'any.empty':
                        errorMessage = 'Le mot de passe doit être renseigné';
                        break;
                    case 'string.min':
                        errorMessage = 'Le mot de passe doit contenir au moins 8 caractères';
                        break;  
                    case 'string.max':
                        errorMessage = 'Le mot de passe ne doit pas dépasser 25 caractères';
                        break;                    
                }
            }
            if ([name][0] === 'email'){
                const error = Joi.validate(obj,schema).error.details[0].type;
                switch (error){
                    case 'string.email':
                        errorMessage = 'Veuillez renseigner un e-mail valide';
                        break;
                    case 'any.empty':
                        errorMessage = 'L\'adresse Email doit être renseignée';
                        break;                
                }
            }
            if ([name][0] === 'pass'){
                const error = Joi.validate(obj,schema).error.details[0].type;
                switch (error) {
                    case 'any.empty':
                        errorMessage = 'Le code d\'accès doit être renseigné';
                        break;
                }
            }
        }
        return errorMessage
    };
    handleSubmit = (e) => {
        e.preventDefault(); 
        const errors = this.validate();
        this.setState({ errors : errors || {}});
        if (errors) return;  
        this.doSubmit();     
    };
    handleChange = ({currentTarget : input}) => {
        const errors = {...this.state.errors}
        const errorMessage = this.validateProperty(input)
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data , errors })
    }
    renderInput(name,label,type,className){
        const { data, errors } = this.state;

        return <Input 
                    type={type}
                    name={name} 
                    value={data[name]} 
                    className={className}
                    label={label} 
                    onChange={this.handleChange}
                    error={errors[name]}
                />
    }
    renderButton(label,className){
        return <button disabled={this.validate()} className={className}>{label}</button>
    }    
}
 
export default Form;