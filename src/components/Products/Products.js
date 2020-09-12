import React, { useEffect, Component } from 'react';
import { Redirect } from 'react-router-dom';
import ProductList from './ProductList';
import Title from '../Title';
import Textblock from '../Textblock';
import { ProductContext, ProductConsumer } from '../../ProductContext';


const Products = () => {
    return (
        <><Title title=" main products" name="our" /><Textblock content="Click to see the details of the product" /><ProductList /></>
    )
}



export default Products