import React, { Component } from 'react';
import { SendHttpRequest } from './services/SendHttpRequest';
import { Redirect } from 'react-router-dom';
import { FaEnvelope, FaUser, FaLock } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            passwordConfirmed: "",

            usernameError: '',
            passwordError: '',
            emailError: '',
            passwordConfirmedError: '',

            registrationErrors: "",
            redirectToReferrer: false
        };
    };

    onChange = (e) => {
        const target = e.target;
        this.setState({ [e.target.name]: e.target.value });
        // console.log(e.target.name,e.target.value)
    }
    signup = (e) => {
        // e.preventDefault();
        // const {
        //     email, password, passwordConfirmed, name
        // } = this.state;
        // const isValid = this.validate();
        // if (isValid) {
        //     axios.post("http://localhost:3000/", {
        //         user: {
        //             email,
        //             password,
        //             passwordConfirmed,
        //             name
        //         }
        //     }, { withCredentials: true }).then(result => console.log(result)).catch(error => console.log(error))


        SendHttpRequest('signup', this.state).then((result) => {
            let responseJson = result;
            if (responseJson.userData) {
                sessionStorage.setItem('userData', JSON.stringify(responseJson));
                this.setState({ redirectToReferrer: true });
                console.log('right')
            }
            else
                alert(result.error);
        });
    };





    signupTest = (e) => {
        e.preventDefault();
        const { email, username, password } = this.state;
        // console.log(this.state);
        // debugger;
        fetch('http://localhost/reactBegin/store-sample/api/index.php?tp=signup',
            {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
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



    validateOne = (e) => {
        let target = e.target;
        const emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$/i;
        const usernameCheck = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i;
        const passwordCheck = /^[A-Za-z0-9!@#$%^&*()_]{4,20}$/i;
        const passwordConfirmedCheck = "";
        let errorMessage = '';
        if (target.name === "email") {
            if (!emailCheck.test(target.value)) {
                errorMessage += 'Please input a valid email';
            }
            this.setState({
                emailError: errorMessage
            });
        };
        if (target.name === "username") {
            if (!usernameCheck.test(target.value)) {
                errorMessage += "The username should be between 8 and 20 characters without '__' or '_'or'.'";
            }
            this.setState({
                usernameError: errorMessage
            });
        }
        if (target.name === "password") {
            if (!passwordCheck.test(target.value)) {
                errorMessage += "password should be between 4 and 20 letters or digits";
            }
            this.setState({
                passwordError: errorMessage
            });
        }

        if (target.name === 're-password') {
            console.log(target.parent);
        }
    }




    render() {
        if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
            return (<Redirect to={'/home'} />)
        }
        const { email, name, password, passwordConfirmed, errorMessage, emailError, usernameError, passwordError, passwordConfirmedError } = this.state;
        return (
            <div className="card col-12">
                <article className="card-body">
                    <h4 className="card-title mt-3 text-center">Create Account</h4>
                    <form onSubmit={this.requestData}>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FaEnvelope />
                                </span>
                            </div>
                            <input type="text" name="email" className="form-control" placeholder="Email" onChange={this.onChange} onBlur={this.validateOne} autoFocus={false} required />
                        </div>
                        <div className="error-message">
                            <p>{emailError}</p>
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><FaUser /></span> </div><input type="text" name="username" placeholder="Username" className="form-control" onChange={this.onChange} onBlur={this.validateOne} autoFocus={false} required />
                        </div>
                        <div className="error-message"><p>{usernameError}</p></div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FaLock />
                                </span>
                            </div>
                            <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.onChange} autoFocus={false} required onBlur={this.validateOne} />
                        </div>
                        <div className="error-message"><p>{passwordError}</p></div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FaLock />
                                </span>
                            </div>
                            <input type="password" className="form-control" name="re-password" placeholder="Repeat password" onChange={this.onChange} onBlur={this.validateOne} autoFocus={false} required />

                        </div>
                        <div className="error-message"><p>{passwordConfirmedError}</p></div>

                        <div className="form-group input-group">
                            <input type="submit" className="btn btn-block btn-primary" value="Sign Up" onClick={this.signupTest} /> </div>
                        {/* <p className="text-center">Have an account? <a href="/">Log In</a></p> */}
                    </form>
                </article>
            </div>
        );
    }
}
export default Signup;