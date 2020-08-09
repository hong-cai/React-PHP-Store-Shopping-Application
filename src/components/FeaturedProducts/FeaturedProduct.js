import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ButtonStyled2 from "../layouts/ButtonStyled2";
import { SaleDiscount } from '../Sales/SaleDiscount';
import { ProductContext } from '../../ProductContext';


export const FeaturedProduct = (props) => {
    const { id, price, title, images, salePrice, postName } = props.item;
    const featuredProducts = useContext(ProductContext);
    // console.log(featuredProducts);

    return (
        <li className="horizontal-scroll-div d-flex flex-column justify-content-center align-items-center text-center p-2 h-100">
            <Link to={`/products/${postName}`}>
                <div className="img-container p-2">
                    <img src={process.env.PUBLIC_URL + `/img/${images}`} alt={title} />
                </div>
            </Link>
            <div className="card-body">
                <Link to={`/products/${postName}`}>
                    <p className="card-title">{title}</p></Link>
                <SaleDiscount price={price} salePrice={salePrice} />

                <ButtonStyled2 onClick={() => {
                    featuredProducts.addOneItemToCart(id);
                }}>Add To Cart</ButtonStyled2>
            </div>
        </li>
    )
}
export default FeaturedProduct;