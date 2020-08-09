import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../../ProductContext';
import ModalStyled from '../layouts/ModalStyled';
import ButtonStyled from '../layouts/ButtonStyled';
import Textblock from '../Textblock';
import { AiOutlineClose } from 'react-icons/ai';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import AddToCartModal from './AddToCartModal';


export default class Modal extends Component {
    render() {
        return (
            <ProductConsumer>
                {value => {
                    const { modalOpen, toggleModalClose } = value;
                    const { title, price, id, images, postName } = value.modalProduct;
                    if (modalOpen === false) {
                        return null;
                    } else {
                        return (
                            <ModalStyled>
                                <div className="container bg-light py-4 d-flex flex-column position-relative">
                                    <div className="row d-flex flex-row flex-end">
                                        <div className="left-column col-md-6 mx-auto">
                                            <img className="w-50 pull-right" src={process.env.PUBLIC_URL + `/img/${images}`} alt={title} />
                                        </div>
                                        <div className="right-column col-md-6">
                                            <div id="modal" className="col-8 mx-5 col-md-6 col-lg-4 text-center text-capitalize p-3">
                                                <h5 className="font-weight-bold text-warning">Great! Added to the cart successfully!</h5>
                                                <h5>{title}</h5>
                                                <h6>${price}</h6>
                                                <ButtonStyled onClick={() => { toggleModalClose() }}>Continue</ButtonStyled>
                                                <Link to="/cart">
                                                    <ButtonStyled cart onClick={() => { toggleModalClose() }}>Checkout</ButtonStyled></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <Textblock content="Guess you may also like:" />
                                    <FeaturedProducts />
                                    <span className="position-absolute top-0 h3 pull-right text-lg" onClick={() => { toggleModalClose() }}><AiOutlineClose />
                                    </span>
                                </div>

                            </ModalStyled>
                        )
                    }

                }}
            </ProductConsumer >
        )
    }
}

