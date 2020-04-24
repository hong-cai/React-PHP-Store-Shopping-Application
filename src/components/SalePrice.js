import React from 'react';

export const SalePrice = (props) => {
    console.log(props.salePrice);
    return (
        <div className="d-flex">
            <h5 style={{ textDecoration: "line-through solid red" }}>
                ${props.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </h5>
            <h5 style={{ color: "red" }}>${props.salePrice.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </h5>
        </div>

    )
}
