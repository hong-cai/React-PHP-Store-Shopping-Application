import React, { Component, useState, useContext } from 'react';
import ButtonStyled2 from '../layouts/ButtonStyled2';
import ButtonStyled3 from '../layouts/ButtonStyled3';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { BackToShopBtn } from '../BackToShopBtn';
import { ProductConsumer, ProductContext } from '../../ProductContext';

import PropTypes from 'prop-types'

class Details extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     postName: 
        // }
    }
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <ProductConsumer>
                    {
                        value => {
                            const thisProduct = value.handleProductDetail;
                            const postName = value.postName;
                            console.log(postName);
                            {/* debugger; */ }
                            {/* const { id, title, images, postName, price, onSale, salePrice, inCart, category, info } = props.product; */ }
                            return (
                                {/* <div>
                        <div className="container">
                            <BackToShopBtn location='Shop' />
                        </div>
                        <div className="container container-md-fluid">
                            <div className="row d-flex flex-column flex-md-row">
                                <div className="left-column col-md-5 w-100">
                                    <img src={process.env.PUBLIC_URL + `/img/${images}`} alt={title} />
                                </div>

                                <div className="right-column col-md-7 w-100">

                                    <div className="product-description">
                                        <span>{category}</span>
                                        <h2>{title}</h2>
                                        <div className="product-price">
                                            <span>{price}</span>
                                        </div>
                                        <div className="py-3">
                                            {ReactHtmlParser(info)}
                                        </div>
                                    </div>
                                    <div className="buttons">
                                        <div>
                                            <ButtonStyled3 onClick={() => {
                                                props.toggleModalOpen(id);
                                            }}
                                                data-target="#productModal">Add to cart</ButtonStyled3>
                                        </div>
                                        <div>
                                            <ButtonStyled2>Buy Now</ButtonStyled2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div> */}
                            );
                        }
                    }
                </ProductConsumer>
            </div>
        )
    }
}

Details.propTypes = {

}

export default Details

