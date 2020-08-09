import React, { Component } from 'react';
import { ProductConsumer, ProductContext } from '../ProductContext';
import Title from '../components/Title';
import Signup from './Signup';
import Login from './Login';
import { AccountInfo } from './AccountInfo';
import TestForm from '../sandbox/TestForm';
import PropTypes from 'prop-types'

class Account extends Component {
    constructor(props) {
        super(props)
    }
    static contextType = ProductContext


    componentDidMount() {
        const context = this.context
        console.log(context.users)
    }


    render() {
        return (
            <div>
                <div>
                    <ProductConsumer>
                        {
                            value => {
                                let loginState = value.loggedIn;
                                let userInfo = value.user;

                                console.log(loginState);






                                return (
                                    <div>
                                        <Title name="Account" title={loginState ? 'Details' : 'Login'} />
                                        <div className="container">
                                            <div className="row login-forms">
                                                {loginState ? (
                                                    <AccountInfo loginState userInfo />
                                                ) : (
                                                        <>
                                                            <div className="col-6">
                                                                <Login />
                                                            </div>
                                                            <div className="col-6">
                                                                <Signup />
                                                            </div>
                                                            {/* This TestForm is for testing php backend purpose  */}
                                                            {/* <TestForm /> */}
                                                        </>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    </ProductConsumer>
                </div>
            </div>
        );
    }
}

Account.propTypes = {

}

export default Account

