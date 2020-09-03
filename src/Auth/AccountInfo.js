import React, { useContext } from 'react';
import { ProductConsumer } from '../ProductContext';
import Title from '../components/Title';
const AccountInfo = () => {



    return (
        <div className="container">
            <div className="row">
                <Title name="User Account" />
                <ProductConsumer>
                    {value => {
                        const { user } = value;
                        return (
                            <div className="col-10 col-md-6 border-info">
                                <h3>Welcome {user.name}</h3>
                                <h3>ID: {user.id}</h3>
                                <h3>Email:{user.email}</h3>
                            </div>
                        )
                    }}

                </ProductConsumer>
            </div>
        </div>
    )
}
export default AccountInfo
