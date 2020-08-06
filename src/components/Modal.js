import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';
import ModalStyled from './layouts/ModalStyled';
import ButtonStyled from './layouts/ButtonStyled';
import { AiOutlineClose } from 'react-icons/ai';
import FeaturedProducts from './FeaturedProducts/FeaturedProducts';


export default class Modal extends Component {
    render() {
        return (
            <ProductConsumer>
                {value => {
                    const { modalOpen, modalClose } = value;
                    const { title, price, id, images, postName } = value.modalProduct;
                    // console.log(value);
                    if (modalOpen === false) {
                        return null;
                    } else {
                        return (
                            <ModalStyled>
                                <div className="container bg-light p-2 d-flex flex-column position-relative">
                                    <div className="row d-flex flex-row flex-end">
                                        <div className="left-column col-md-6 mx-auto">
                                            <img className="w-50 pull-right" src={images} alt={title} />
                                        </div>
                                        <div className="right-column col-md-6">
                                            <div id="modal" className="col-8 mx-5 col-md-6 col-lg-4 text-center text-capitalize p-3">
                                                <h5 className="font-weight-bold text-warning">Adding This Product to Cart?</h5>
                                                <h5>{title}</h5>
                                                <h6>${price}</h6>
                                                <Link to={`products/${postName}`} >
                                                    <ButtonStyled onClick={() => { modalClose() }}>Continue</ButtonStyled></Link>
                                                <Link to="/cart">
                                                    <ButtonStyled cart onClick={() => { modalClose() }}>Checkout</ButtonStyled></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <FeaturedProducts />
                                    <span className="position-absolute top-0 h3 pull-right text-lg" onClick={() => { console.log(modalClose) }}><AiOutlineClose />
                                    </span>
                                </div>

                            </ModalStyled>)
                    }

                }}
            </ProductConsumer >
        )
    }
}

