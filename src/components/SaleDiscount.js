import React from 'react';
import SaleDiscountStyled from './layouts/SaleDiscountStyled';

export const SaleDiscount = (props) => {
    // console.log(((props.price - props.salePrice) / props.price) * 100);
    return (
        <SaleDiscountStyled className="d-flex">
            <h6 className="hover-disprice">${props.salePrice.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </h6>
            <div className="discount"><p>{(((props.price - props.salePrice) / props.price) * 100).toFixed(2)}%off</p></div>
        </SaleDiscountStyled>

    )
}
