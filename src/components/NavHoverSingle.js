import React from 'react';
import { Link } from 'react-router-dom';
import { SaleDiscount } from '../components/SaleDiscount';
import { FaTrashAlt } from 'react-icons/fa';


export const NavHoverSingle = (props) => {
    // console.log(props.handleCount);
    const { images, price, postName, title, count, onSale, salePrice, id } = props.extractProps;


    return (
        <div className="hover-cart-details">
            <div className="hover-cart-item">
                <div className="img-div">
                    <img className='hover-cart-item-img' src={images}
                        alt={title} />
                </div>
                <div className="hover-cart-item-details">
                    <Link to={`/products/${postName}`}><div className="hover-title">{title}</div></Link>
                    <div className="reg-price">
                        {onSale === true ? <SaleDiscount price={price} salePrice={salePrice} /> : <h6>${price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</h6>}
                    </div>
                </div>
                <div>
                    <input name="count" type="number" defaultValue={count}
                        onChange={(e) => { props.handleCount(e.target.value) }}
                    // onChange={e => setCount({ quantity: e.target.value })}
                    />
                </div>
            </div>
            <div className="remove" onClick={
                () => { props.removeItem(id) }
            }>
                <span><FaTrashAlt /></span>
            </div>
        </div>
    )
}
