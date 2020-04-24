import React from 'react';
import { Link } from 'react-router-dom';
import ButtonStyled from '../components/layouts/ButtonStyled';

export const BackToShopBtn = () => {
    return (
        <div className="p-3">
            <Link to="/shop">
                <p className="text-center"> <i className="fa fa-arrow-left" aria-hidden="true"></i> Back To the Shop</p>
            </Link>
        </div>
    )
}
