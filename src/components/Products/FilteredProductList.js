import React, { Component } from 'react';
import Product from './Product';
import { NotFound } from '../NotFound';
import { Loader } from '../Loader';
//import {storeProducts} from '../data';
import { ProductConsumer } from '../../context';

export default () => {
    return (
        <section className='container'>
            <ul className="row mx-auto">
                <ProductConsumer>
                    {
                        value => {
                            const filteredProducts = value.filteredProducts;
                            return (
                                filteredProducts.length > 0 ? value.filteredProducts.map(
                                    item => {
                                        // console.table(item.id);
                                        return (
                                            <Product key={item.id} id={item.id} product={item} />
                                        )
                                    }
                                ) : (<NotFound message="Nothing Found" />)
                            )
                        }
                    }
                </ProductConsumer>
            </ul>
        </section>
    )
}