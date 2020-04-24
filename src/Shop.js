import React, { Component } from 'react';
import ProductList from './components/ProductList';
import Title from './components/Title';
import Filter from './components/Filter';

class Shop extends Component {

    render() {
        return (
            <div className="container-fluid">
                <Title name='company' title='shop' />
                <Title name='company' title='products' />
                <section className="container-fluid">
                    <div className="row">
                        <div className="d-flex justify-content-center">
                            <Filter />
                            <ProductList />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Shop;