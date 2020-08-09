import React, { Component } from 'react';
import Product from './Product';
import { NotFound } from '../NotFound';
import { Loader } from '../Loader';
//import {storeProducts} from '../data';
import { ProductConsumer } from '../../ProductContext';

export default (props) => {
    const { } = props;
    return (
        <section className='container'>
            <ul className="row mx-auto">
                <ProductConsumer>
                    {
                        value => {
                            const filteredProducts = value.filteredProducts;
                            if (value.loading === true) {
                                return (filteredProducts.length > 0 ? (value.filteredProducts.map(
                                    item =>
                                        <Product key={item.id} id={item.id} product={item} />
                                )) : (<NotFound message="Nothing Found" />)
                                )
                            } else {
                                return (
                                    <Loader />
                                )
                            }
                        }
                    }
                </ProductConsumer>
            </ul>
        </section>
    )
}






