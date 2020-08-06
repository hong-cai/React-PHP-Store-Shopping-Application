import React from 'react';
import FilteredProductList from './components/Products/FilteredProductList';
import Title from './components/Title';
import Filter from './components/Filter';

const Shop = () => {

    return (
        <div className="container-fluid">
            <Title name='company' title='shop' />
            <Title name='company' title='products' />
            <section className="container">
                <div className="row d-flex justify-content-center mx-auto">
                    <Filter />
                    <FilteredProductList />
                </div>
            </section>
        </div>
    );
}

export default Shop;