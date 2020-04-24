import React, { Component } from 'react';
import Title from './components/Title';
import Signup from './Signup';

export default class Contact extends Component {
    render() {
        return (
            <div>
                <Title name='company' title='contact' />
                <Signup />
            </div>
        )
    }
}