import React from 'react';
import { BackToShopBtn } from './BackToShopBtn';

export const NotFound = (props) => {
    return (
        <div className="container d-flex flex-column">
            <h2 className="text-center "><span><h2>😭</h2></span>{props.message}</h2>
            <BackToShopBtn location='products' />
        </div>
    )
}

