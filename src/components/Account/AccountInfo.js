import React, { useContext } from 'react';
import { ProductContext } from '../../context';

export const AccountInfo = () => {
    const loginUser = useContext(ProductContext);
    const { loggedIn, user } = loginUser;
    return (
        <div>
            <h3>Welcome {user}</h3>
        </div>
    )
}
