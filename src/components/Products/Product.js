import React from 'react';
import { Link } from 'react-router-dom';
import ProductWrapper from '../layouts/ProductWrapper';
import PropTypes from 'prop-types';
import { ProductConsumer } from '../../ProductContext';
import ButtonStyled2 from '../layouts/ButtonStyled2';
import SaleTag from '../layouts/SaleTag';
import { SaleDiscount } from '../Sales/SaleDiscount';

const Product = (props) => {
    const { id, title, images, postName, price, onSale, salePrice } = props.product;
    // console.log(this.props.product.title);
    return (
        <ProductWrapper className='mx-auto col-lg-3 col-md-4  col-sm-6 col-xm-12 mb-3 mx-auto px-2'>
            <ProductConsumer>
                {value => {
                    // console.log(onSale);
                    return (
                        <li className="card h-100 bg-white pb-3 card-select">

                            {onSale ? <SaleTag>SALE</SaleTag> : ""}
                            <Link to={`/products/${postName}`}>
                                <div className="img-container p-4 d-flex justify-content-center">
                                    <img
                                        //  onClick={value.handleProductDetail(postName)} 
                                        className='cart-img-top' src={process.env.PUBLIC_URL + `/img/${images}`} alt={postName} width='80%' /></div>
                            </Link>
                            <div className="card-body d-flex flex-column justify-content-center align-items-center text-center px-4">
                                <Link to={`/products/${postName}`}><h6 className="card-title" data-tooltip={title} >{title}</h6></Link>
                                {onSale === true ? <SaleDiscount price={price} salePrice={salePrice} /> : <h6>${price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</h6>}
                                <ButtonStyled2 onClick={() => {
                                    value.addOneItemToCart(id);
                                    // console.log(value);
                                    // value.modalOpen(id);
                                }}>Add To Cart</ButtonStyled2>
                            </div>


                        </li>
                    )
                }}


            </ProductConsumer>
        </ProductWrapper >

    )
}

export default Product;

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



