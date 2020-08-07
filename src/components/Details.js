import React, { useState, useContext } from 'react';
import ButtonStyled2 from './layouts/ButtonStyled2';
import ButtonStyled3 from './layouts/ButtonStyled3';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { BackToShopBtn } from './BackToShopBtn';
import { ProductConsumer, ProductContext } from '../context';

export const Details = (props) => {
    const { id, title, images, postName, price, onSale, salePrice, inCart, category, info } = props.product;
    console.log(props.modalOpen);
    return (
        <div>
            <div className="container">
                <BackToShopBtn location='Shop' />
            </div>
            <div className="container container-md-fluid">
                <div className="row d-flex flex-column flex-md-row">
                    {/* <!-- Left Column / Headphones Image --> */}
                    <div className="left-column col-md-5 w-100">
                        <img src={process.env.PUBLIC_URL + `/img/${images}`} alt={title} />
                    </div>

                    {/* <!-- Right Column --> */}
                    <div className="right-column col-md-7 w-100">

                        {/* <!-- Product Description --> */}
                        <div className="product-description">
                            <span>{category}</span>
                            <h2>{title}</h2>
                            {/* <!-- Product Pricing --> */}
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


        </div>
    );
}

