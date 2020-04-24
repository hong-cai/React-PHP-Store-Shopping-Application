import React, { Component } from 'react';
import Title from './components/Title'

export default class Error extends Component{
    render(){
        return (
            <div>
            <Title name='page' title='not found' />
            </div>
        )
    }
}