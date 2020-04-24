import React, { Component } from 'react';
import Product from './Product';
//import {storeProducts} from '../data'
import { ProductConsumer } from '../context';
export default class ProductList extends Component {
    render() {
        return (
            <section className='container'>
                <div className="row col-12 mx-sm-1">
                    <div className=''>
                        <div className="row">
                            <ProductConsumer>
                                {
                                    value => {
                                        // console.log(value);
                                        return (
                                            value.filteredProducts.map(
                                                item => {
                                                    // console.table(item.id);
                                                    return (
                                                        <Product key={item.id} id={item.id} product={item} />
                                                    )
                                                }
                                            )
                                        )
                                    }
                                }
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
