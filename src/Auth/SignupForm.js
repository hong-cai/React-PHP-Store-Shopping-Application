import React, { Component } from 'react';
// import { SendHttpRequest } from './services/SendHttpRequest';
import { Redirect } from 'react-router-dom';
import { FaEnvelope, FaUser, FaLock } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import axios from 'axios';
import uuid from 'uuid';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {},
            error: {},
            nameError: '',
            passwordError: '',
            emailError: '',
            passwordConfirmedError: '',

            registrationErrors: "",
            redirectToReferrer: false
        };
    };

    signupLocal = (e) => {
        e.preventDefault();
        console.log();

    }



    signupRemote = (e) => {
        e.preventDefault();
        const {
            email, password, passwordConfirmed, name
        } = this.state;
        const isValid = this.validateOne();
        if (isValid) {
            axios.post("http://localhost:3000/", {
                user: {
                    email,
                    password,
                    passwordConfirmed,
                    name
                }
            }, { withCredentials: true }).then(result => console.log(result)).catch(error => console.log(error))


            // SendHttpRequest('signup', this.state).then((result) => {
            //     let responseJson = result;
            //     if (responseJson.userData) {
            //         sessionStorage.setItem('userData', JSON.stringify(responseJson));
            //         this.setState({ redirectToReferrer: true });
            //         console.log('right')
            //     }
            //     else
            //         alert(result.error);
            // });
        };
    }


    //THIS CODE COULD BE FOUND IN:https://github.com/hong-cai/php-MVC-panel-adminLTE-bootstrap-javascript
    signupTest = (e) => {
        e.preventDefault();
        const { email, name, password } = this.state;
        // console.log(this.state);
        // debugger;
        fetch('http://localhost/reactBegin/store-sample/api/index.php?tp=signup',
            {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                }),
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
        ).then(responseData => {
            // if (response.status >= 400) {
            //     return response.json().then(errResData => {
            //         const error = new Error('something wrong');
            //         error.data = errResData;
            //         throw error;
            //     })
            // }
            console.log('response:: ', responseData);
            return responseData.json();
        })
            .then(json => console.log(json));
    };



    //Locate the target input and update state
    handleChange = (e) => {
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({
            input
        }, () => { console.log(this.state.input) });
    }

    //function to check field
    checkField = (reg, field, errorField, errorMsg) => {
        let isValid = true;
        let errorMessage = '';
        if (reg.test(field) === false) {
            isValid = false;
            errorMessage += errorMsg;
        }
        this.setState({
            [errorField]: errorMessage
        });
        return isValid;
    }

    //validate each field with checkField() function
    validateOne = (e) => {
        const emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$/i;
        const nameCheck = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i;
        const passwordCheck = /^[A-Za-z0-9!@#$%^&*()_]{4,20}$/i;
        const target = e.target;
        let isValid = true;
        let input = this.state.input;
        let errorMessage = '';
        if (target.name === 'email') {
            console.log(this.checkField(emailCheck, input['email'], 'emailError', 'Please input a valid email'));
        }
        if (target.name === 'name') {
            this.checkField(nameCheck, input['name'], 'nameError', "The username should be between 4 and 20 characters without '__' or '_'or'.'");
        }
        if (target.name === 'password') {
            this.checkField(passwordCheck, input['password'], 'passwordError', 'password should be between 4 and 20 letters or digits');
        }
        if (target.name === 're-password') {
            if (target.value !== input['password']) {
                isValid = false;
                errorMessage += "Passwords don't match.";
                this.setState({
                    passwordConfirmedError: errorMessage
                });
            }
        }
        return isValid;
    };



    render() {
        if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
            return (<Redirect to={'/home'} />)
        }
        const { email, name, password, passwordConfirmed, emailError, nameError, passwordError, passwordConfirmedError } = this.state;
        return (
            <div className="card col-12">
                <article className="card-body">
                    <h4 className="card-title mt-3 text-center">Create Account</h4>
                    <form method="post" onSubmit={this.signupLocal}>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FaEnvelope />
                                </span>
                            </div>
                            <input type="text" name="email" className="form-control" placeholder="Email" onChange={this.handleChange} onBlur={this.validateOne} autoFocus={false} required />
                        </div>
                        <div className="error-message">
                            <p>{emailError}</p>
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><FaUser /></span> </div><input type="text" name="name" placeholder="Username" className="form-control" onChange={this.handleChange} onBlur={this.validateOne} autoFocus={false} required />
                        </div>
                        <div className="error-message"><p>{nameError}</p></div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FaLock />
                                </span>
                            </div>
                            <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} autoFocus={false} required onBlur={this.validateOne} />
                        </div>
                        <div className="error-message"><p>{passwordError}</p></div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FaLock />
                                </span>
                            </div>
                            <input type="password" className="form-control" name="re-password" placeholder="Repeat password" onChange={this.handleChange} onBlur={this.validateOne} autoFocus={false} required />
                        </div>
                        <div className="error-message"><p>{passwordConfirmedError}</p></div>
                        {/* <div className="form-group input-group d-none">
                            <input type="id" className="form-control" name="id" onChange={this.handleChange} autoFocus={true} required />
                        </div> */}

                        <div className="form-group input-group">
                            <input type="submit" className="btn btn-block btn-primary" value="Sign Up" /> </div>
                        {/* <p className="text-center">Have an account? <a href="/">Log In</a></p> */}
                    </form>
                </article>
            </div>
        );
    }
}
export default Signup;