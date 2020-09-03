import React from 'react';
import { ProductConsumer, ProductContext } from '../ProductContext';
import Title from '../components/Title';
import Signup from './SignupForm';
import Login from './LoginForm';
import TestForm from '../sandbox/TestForm';



const Account = () => {
    return (
        <div>
            <Title name="Account" title="Login" />
            <div className="container">
                <div className="row login-forms">

                    <div className="col-6">
                        <Login />
                    </div>
                    <div className="col-6">
                        <Signup />
                    </div>
                    {/* This TestForm is for testing php backend purpose  */}
                    {/* <TestForm /> */}

                </div>
            </div>
        </div>
    )
}
export default Account



