import React from 'react';
import { Link } from 'react-router-dom';
import ButtonStyled from '../components/layouts/ButtonStyled';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
export const BackToShopBtn = ({ location }) => {
    return (
        <div className="row mb-0">
            <div className="p-3">
                <Link to={`/${location}`}>
                    <p className="text-center"> <AiOutlineDoubleLeft /> Back To the {location}</p>
                </Link>
            </div>
        </div >
    )
}
