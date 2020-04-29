import React from 'react';
import SaleDiscountStyled from './layouts/SaleDiscountStyled';

export const SaleDiscount = (props) => {
    // console.log(((props.price - props.salePrice) / props.price) * 100);
    return (
        <SaleDiscountStyled>
            <div className="price-div">
                <p className="reg-price">${props.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </p>
                <p className="reg-disprice">${props.salePrice.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </p>
            </div>
            <div className="discount"><p>{(((props.price - props.salePrice) / props.price) * 100).toFixed(2)}%off</p></div>
        </SaleDiscountStyled>
    )
}
