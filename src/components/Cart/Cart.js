import React, { Component } from 'react';
import { ProductConsumer } from '../../ProductContext';
import { ListTitles } from './ListTitles';
import Title from '../Title';
import CartProducts from './CartProducts';
import CartTotal from './CartTotal';
import { Link } from 'react-router-dom';
import { BackToShopBtn } from '../BackToShopBtn';
import PaypalBtn from './PaypalBtn';

const Cart = () => {
    return (
        <section className="container d-flex flex-column">
            <ProductConsumer>
                {value => {
                    const { cart } = value;
                    if (cart.length > 0) {
                        return (
                            <React.Fragment>
                                <Title title="Shopping Cart" />
                                <BackToShopBtn location="shop" />
                                <div className="d-flex flex-md-row flex-column justify-content-center align-content-center">
                                    <div className="border border-info bg-light col-10 col-md-9 mx-md-2 mx-5 my-3 px-4">
                                        <ListTitles
                                            selectAll={value.selectAll}
                                        />
                                        <CartProducts value={value} />
                                    </div>
                                    <div className="border border-info bg-light col-md-3 col-10  mx-md-2 mx-5  my-3 ">
                                        <CartTotal value={value} />
                                        <div className="d-flex justify-content-center mb-4"><PaypalBtn /></div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    } else {
                        return (
                            <React.Fragment>
                                <Title title="Shopping Cart" />
                                <p className="text-center">Nothing in your shopping cart yet</p>
                                <BackToShopBtn location='Shop' />
                            </React.Fragment>
                        )
                    }

                }}
            </ProductConsumer>
        </section>
    )
}

export default Cart;
