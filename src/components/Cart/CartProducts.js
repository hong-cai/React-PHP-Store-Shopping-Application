import React from 'react';
import { Link } from 'react-router-dom';
import ButtonStyled2 from '../../components/layouts/ButtonStyled2';
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';

const CartProducts = (props) => {
    const cart = props.value.cart;
    // console.log('props: ', props);
    // console.log('cart: ', props.value.getCartFromStorage());
    const { selectOneItem, incrementItems, decrementItems, removeItem, includeId } = props.value;
    return (
        <div>
            {
                cart.map(item => {
                    const { images, title, postName, price, total, id, count, onSale, salePrice } = item;
                    return (
                        <div className="container-fluid text-center d-md-block  p-0" key={id}>

                            <div className="row mx-0">
                                <div className="col-1  m-0">
                                    <input id={id} type='checkbox' className="checkbox-wrapper"
                                        checked={includeId.includes(id)}
                                        onChange={(e) => { selectOneItem(e) }}
                                    />
                                </div>
                                <div className="col-1 m-auto p-0 d-none d-sm-inline">
                                    <img src={process.env.PUBLIC_URL + `/img/${images}`} alt={title} className="mr-0 img-fluid" />
                                </div>
                                <div className="col-2 m-auto p-0">
                                    <Link to={`../products/${postName}`} > {title} </Link>
                                </div>
                                <div className="cart-price col-1  m-auto p-0">
                                    {onSale === true ? <div>
                                        <p style={{ textDecoration: "line-through solid red" }}>
                                            ${price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                                        </p>
                                        <p style={{ color: "red" }}>{parseFloat(salePrice).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                                        </p>
                                    </div> : <p>${price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>}
                                </div>
                                <div className="col-2 m-auto p-0">
                                    <div className="d-flex justify-content-center ">
                                        <div className="p-2">
                                            <ButtonStyled2 className="p-1" onClick={() => { incrementItems(id) }}> <FaPlus /> </ButtonStyled2></div>
                                        <span className="my-auto"> <h6>{count}</h6>
                                        </span>
                                        <div className="p-2">
                                            <ButtonStyled2 className="p-1" onClick={() => { decrementItems(id) }}> <FaMinus /> </ButtonStyled2></div>
                                    </div></div>
                                <div className="col-1 m-auto p-0">
                                    <span className="trash-click" onClick={() => { removeItem(id) }}><FaTrashAlt /></span>
                                </div>
                                <div className="col-1 m-auto p-0">
                                    <h6>${total}</h6>
                                </div>
                            </div>
                        </div>
                    )
                }
                )
            }
        </div >
    )
}

export default CartProducts;

