import React, { Component } from 'react';
import Title from './components/Title';
import ProductList from './components/ProductList';
import Example from './components/Example';
import FeaturedProducts from './components/FeaturedProducts';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Title name='company' title='home' />
                <FeaturedProducts />
                <ProductList />
            </div>
        )
    }
}