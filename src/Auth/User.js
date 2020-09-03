import React, { Component } from 'react';
import { ProductConsumer, ProductContext } from '../ProductContext';
import PropTypes from 'prop-types'
import Title from '../components/Title';
import { AccountInfo } from './AccountInfo';
import Signup from './SignupForm';
import Login from './LoginForm';
import { Redirect } from 'react-router-dom';

class User extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {

    }

    render() {

        return (
            <div>Users List Page</div>
        )
    }
}

User.propTypes = {

}

export default User