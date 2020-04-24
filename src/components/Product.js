import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductWrapper from './layouts/ProductWrapper';
import PropTypes from 'prop-types';// this 'prop-types' is a must,not from 'react'
import { ProductConsumer } from '../context';
import ButtonStyled2 from '../components/layouts/ButtonStyled2';
import SaleTag from '../components/layouts/SaleTag';
import { SaleDiscount } from '../components/SaleDiscount';

export default class Product extends Component {

    render() {
        const { id, title, images, postName, price, category, onSale, salePrice } = this.props.product;
        // console.log(this.props.product.title);
        return (
            <ProductWrapper className='mx-auto col-xl-3 col-lg-4 col-md-6 col-12 mb-3 px-2'>
                <ProductConsumer>
                    {value => {
                        // console.log(onSale);
                        return (
                            <div className="card h-100 col-md-12 bg-white pb-3 card-select">

                                {onSale ? <SaleTag>SALE</SaleTag> : ""}
                                <Link to={`/products/${postName}`}>
                                    <div className="img-container p-4">
                                        <img className='cart-img-top' src={images} alt={title} width='100%' /></div>
                                </Link>
                                <div className="card-body d-flex flex-column justify-content-center align-items-center text-center p-0">
                                    <Link to={`/products/${postName}`}><h6 className="card-title" data-tooltip={title} >{title}</h6></Link>
                                    {onSale === true ? <SaleDiscount price={price} salePrice={salePrice} /> : <h6>${price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</h6>}
                                </div>

                                <ButtonStyled2 onClick={() => {
                                    value.addOneItemToCart(id);
                                    // console.log(value);
                                    // value.modalOpen(id);
                                }}>Add To Cart</ButtonStyled2>

                            </div>
                        )
                    }}


                </ProductConsumer>
            </ProductWrapper >

        )
    }
}


Product.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    info: PropTypes.string,
    productBrief: PropTypes.string,
    productSku: PropTypes.number,
    category: PropTypes.string,
    inCart: PropTypes.bool,
    images: PropTypes.string,
    // images:PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
    total: PropTypes.number,
    count: PropTypes.number,
    postName: PropTypes.string
}



// SampleProduct For The Early Stage Tests

export class SampleProduct extends Component {
    render() {
        const { id, title, images, price, category, info, productSku, inCart } = this.props.detailedProduct;
        console.log('this.props.detailedProduct', this.props.detailedProduct)
        return (

            <ProductWrapper className='col-9 shadow-sm mx-auto col-md-6 col-lg-4 my-1'>

                <div className="cart">
                    <div className="cart-body">
                        <h4 className="cart-title">{title}</h4>
                        <h6 className="cart-subtitle text-muted">Category-Sample: {category}</h6>
                    </div>
                    <Link to='/details'>
                        <div className="img-container" onClick={() => {
                            console.log('here')
                        }
                        } >
                            <img className='cart-img-top' src={images} alt={title} width='100%' />
                        </div></Link>
                    <div className="cart-body">
                        <p className="cart-text">{info}</p>
                        <a href="https://google.com" className="cart-link"><h4>{price}</h4></a>
                        <button className='cart-btn' disabled={inCart ? true : false} onClick={() => {
                            console.log('not yet modal for sampleProduct');
                            // value.addOneItemToCart(id);
                            //  value.openModal(id);
                        }
                        }>{inCart ? (<p className="text-capitalize mb-0" disabled> {' '}inCart</p>) : (<i className='fas fa-cart-plus'> add to cart</i>)}</button>
                    </div>
                </div>

            </ProductWrapper>
        )
    }
}
SampleProduct.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    info: PropTypes.string,
    inCart: PropTypes.bool,
    img: PropTypes.string,
    company: PropTypes.string,
    price: PropTypes.number
}

