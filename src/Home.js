import React, { Component } from 'react';
import Title from './components/Title';
import Textblock from './components/Textblock';
import ProductList from './components/Products/ProductList';
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts';

const Home = () => {
    return (
        <div>
            <Title name='company' title='home' />
            <Textblock content="Best hygiene products for the hard time" />
            <FeaturedProducts />
            <ProductList />
        </div>
    )
}
export default Home;