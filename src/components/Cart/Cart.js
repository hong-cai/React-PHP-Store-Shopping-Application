import React, { Component } from 'react';
import { ProductConsumer } from '../../context';
import { ListTitles } from './ListTitles';
import Title from '../Title';
import { CartProducts } from './CartProducts';
import { CartTotal } from './CartTotal';
import { Link } from 'react-router-dom';
import { BackToShopBtn } from '../BackToShopBtn';
import PaypalBtn from './PaypalBtn';

export default class Cart extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         itemSelected: false,
    //         selectedProducts: []
    //     };
    // }





    render() {
        return (
            <section>
                <ProductConsumer>
                    {value => {
                        const { cart } = value;
                        if (cart.length > 0) {
                            return (
                                <React.Fragment>
                                    <Title title="Shopping Cart" />
                                    <div className="row py-1 px-5">
                                        <BackToShopBtn />
                                    </div>
                                    <div className="d-flex">
                                        <div className="border border-info bg-light col-12 col-xl-8 col-lg-8 mx-auto">
                                            <ListTitles
                                                selectAll={value.selectAll}
                                            />
                                            <CartProducts value={value} />
                                        </div>
                                        <div className="border border-info bg-light col-3 col-xl-3 col-lg-3 mx-auto">
                                            <CartTotal value={value} />
                                            <span className="text-center"><PaypalBtn /></span>

                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        } else {
                            return (
                                <React.Fragment>
                                    <Title title="Shopping Cart" />
                                    <p className="text-center">Nothing in your shopping cart yet</p>
                                    <BackToShopBtn />
                                </React.Fragment>
                            )
                        }

                    }}
                </ProductConsumer>
            </section>
        )
    }
}
