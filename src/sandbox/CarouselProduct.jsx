import React from 'react';
import { Link } from 'react-router-dom';
import ButtonStyled2 from "../components/layouts/ButtonStyled2";
import { SaleDiscount } from '../components/Sales/SaleDiscount';


export const CarouselProduct = (props) => {
    const { id, price, title, images, salePrice, onSale } = props.item;



    return (
        <li className="horizontal-scroll-div card d-flex flex-column justify-content-center align-items-center text-center p-2 h-100">
            <Link to='/details'><div className="img-container p-4"><img src={images} alt="img" /></div></Link>
            <div className="card-body">
                <Link to='/details'><p className="card-title" >{title}</p></Link>
                <SaleDiscount price={price} salePrice={salePrice} />
                <ButtonStyled2>Add To Cart</ButtonStyled2>
            </div>
        </li>
    )
}
export default CarouselProduct;