import React from 'react';
import { Link } from 'react-router-dom';
import ButtonStyled2 from "../components/layouts/ButtonStyled2";


export const FeaturedProduct = (props) => {
    const { id, price, title, images, salePrice, onSale } = props.item;



    return (
        <li className="horizontal-scroll-div card-body d-flex flex-column justify-content-center align-items-center text-center px-0 h-100">
            <Link to='/details'><img src={images} alt="img" /></Link>
            <Link to='/details'><h5>{title}</h5></Link>
            {onSale === true ? <div>
                <h5 style={{ textDecoration: "line-through solid red" }}>
                    ${price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </h5>
                <h5 style={{ color: "red" }}>{parseFloat(salePrice).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </h5>
            </div> : <h5>${price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</h5>}
            <ButtonStyled2>Add To Cart</ButtonStyled2>
        </li>
    )
}
export default FeaturedProduct;