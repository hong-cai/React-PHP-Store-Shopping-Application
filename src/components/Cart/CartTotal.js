import React from 'react';
import ButtonStyled2 from '../../components/layouts/ButtonStyled2';
import PropTypes from 'prop-types';
const CartTotal = (props) => {
    const { cartSubTotal, cartTax, total, clearCart } = props.value;

    return (
        <div className="container">
            <div className="row col-12 mx-auto">
                <div className="text-right col-12 text-capitalize text-center">
                    <div className="py-3">
                        <ButtonStyled2 onClick={() => clearCart()}>Clear Cart</ButtonStyled2>
                    </div>
                    <h6>SubTotal: </h6>
                    <p>${cartSubTotal}</p>
                    <h6>GST:  </h6>
                    <p>${cartTax}</p>
                    <h5>Total:</h5>
                    <p> ${total}</p>
                </div>
            </div>
        </div>
    )
}
CartTotal.propTypes = {
    cartSubTotal: PropTypes.number,
    cartTax: PropTypes.number,
    total: PropTypes.number,
    clearCart: PropTypes.func
}
export default CartTotal;