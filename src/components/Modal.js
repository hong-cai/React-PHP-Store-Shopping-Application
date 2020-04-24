import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';
import ModalStyled from './layouts/ModalStyled';
import ButtonStyled from './layouts/ButtonStyled';

export default class Modal extends Component {

    render() {
        return (
            <ProductConsumer>
                {value => {
                    const { modalOpen, modalClose } = value;
                    const { title, price, id, images } = value.modalProduct;
                    // console.log(value);
                    if (modalOpen === false) {
                        return null;
                    } else {
                        return (
                            <ModalStyled>
                                <div className="container">
                                    <div className="row">
                                        <span onClick={() => { console.log(modalClose) }}> <i className="fa fa-window-close" aria-hidden="true"></i> </span>
                                        <div id="modal" className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-3">
                                            <h5>Successfully Added</h5>
                                            <img src={images} alt={title} width="80%" />
                                            <p>{id}</p>
                                            <p>{title}</p>
                                            <p>${price}</p>
                                            <Link to="/">
                                                <ButtonStyled onClick={() => { modalClose() }}>Continue</ButtonStyled></Link>
                                            <Link to="/cart">
                                                <ButtonStyled cart onClick={() => { modalClose() }}>Checkout</ButtonStyled></Link>
                                        </div>

                                    </div>

                                </div>

                            </ModalStyled>)
                    }


                }}
            </ProductConsumer>
        )

    }

}