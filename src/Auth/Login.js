import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { SendHttpRequest } from '../services/SendHttpRequest';
import { FaEnvelope, FaLock } from 'react-icons/fa';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: ''
            // redirectToReferrer: false
        };
    }





    loginState = () => {

    }

    //CODE EXAMPLE,details in:https://github.com/hong-cai/php-MVC-panel-adminLTE-bootstrap-javascript
    loginTest = (e) => {
        e.preventDefault();
        fetch('http://localhost/store-sample/api/index.php?tp=login',
            {
                method: 'POST',
                body: JSON.stringify(this.state),
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
        }).then(json => console.log(json));
    }


    login = (e) => {
        e.preventDefault();
        if (this.state.email && this.state.password) {
            this.SendHttpRequest('login', 'POST', this.state)
                .then((responseJson) => {
                    console.log('result', responseJson);
                    if (responseJson.userData) {
                        sessionStorage.setItem('userData', JSON.stringify(responseJson));
                        this.setState({ redirectToReferrer: true });
                        console.log('right');
                    }
                    else {
                        console.log(responseJson.error);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
            // .then((result) => {
            //     let responseJson = result;
            //     console.log('responseJson', responseJson);
            //     if (responseJson.userData) {
            //         sessionStorage.setItem('userData', JSON.stringify(responseJson));
            //         this.setState({ redirectToReferrer: true });
            //         console.log('right');
            //     }
            //     else {
            //         alert(result.error);
            //     }
            // });
        }
    }




    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };


    validateLogin = (e) => {
        let target = e.target;
        const emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$/i;
        let errorMessage = '';
        if (target.name === "email") {
            if (!emailCheck.test(target.value)) {
                errorMessage += 'Please input a valid email';
            }
            this.setState({
                emailError: errorMessage
            });
        };
        if (target.name === "password") {
            if (!emailCheck.test(target.value)) {
                errorMessage += 'Please input a valid email';
            }
            this.setState({
                emailError: errorMessage
            });
        };
    }

    render() {
        // if (this.state.redirectToReferrer) {
        //     return (<Redirect to={'/cart'} />)
        // }
        if (sessionStorage.getItem('userData')) {
            return (<Redirect to={'/cart'} />)
        }
        const { emailError, passwordError } = this.state;
        return (
            <div className="card col-12">
                <article className="card-body">
                    <h4 className="card-title mt-3 text-center">Login</h4>
                    <p>
                        <a href="/" className="btn btn-block btn-google"> <i className="fab fa-google-f"></i> &nbsp; Login via google</a>
                    </p>
                    <p className="divider-text">
                        <span className="bg-light">OR</span>
                    </p>
                    <form>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FaEnvelope />
                                </span>
                            </div>
                            <input type="text" name="email" className="form-control" placeholder="Email" onChange={this.onChange} onBlur={this.validateLogin} autoFocus={false} required />
                        </div>
                        <div className="error-message"><p>{emailError}</p></div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FaLock />
                                </span>
                            </div>
                            <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.onChange} onBlur={this.validateLogin} autoFocus={false} required />
                        </div>
                        <div className="error-message"><p>{passwordError}</p></div>

                        <div className="form-group input-group">
                            <input type="submit" className="btn btn-block btn-primary" value="Login" onClick={this.loginTest} /> </div>
                        {/* <div className="form-group input-group">
                            <input type="submit" className="btn m-auto" value="Forget Password?" onClick={this.resetPass} /> </div> */}
                    </form>
                </article>
            </div>
        );
    }
}
export default Login;