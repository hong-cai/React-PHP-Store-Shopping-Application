import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { SaleDiscount } from '../Sales/SaleDiscount';
import { FaTrashAlt } from 'react-icons/fa';


export const NavHoverSingle = (props) => {
    // console.log(props.handleCount);
    const { images, price, postName, title, count, onSale, salePrice, id } = props.extractProps;


    return (
        <li className="hover-cart-details">
            <div className="hover-cart-item">
                <div className="img-div">
                    <img className='hover-cart-item-img' src={process.env.PUBLIC_URL + `/img/${images}`}
                        alt={title} />
                </div>
                <div className="hover-cart-item-details">
                    <Link to={`../products/${postName}`}><div className="hover-title">{title}</div>
                    </Link>

                    <div className="reg-price">
                        {onSale === true ? <SaleDiscount price={price} salePrice={salePrice} /> : <h6>${price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</h6>}
                    </div>
                </div>
                <div>
                    <input id={id} name="count" type="number" defaultValue={count}
                        onChange={props.onChange} min="0" onKeyUp={(e) => e.target.value < 0 ? e.target.value = Math.abs(e.target.value) : e.target.value}
                    />
                </div>
            </div>
            <div className="remove" onClick={
                (e) => { props.removeItem(id); e.stopPropagation() }
            }>
                <span><FaTrashAlt /></span>
            </div>

        </li>
    )
}
