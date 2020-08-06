import React from 'react';
import PropTypes from 'prop-types';



export const ListTitles = (props) => {
    // console.log('props.selectAll: ', props);
    const { selectAll, ischecked } = props;

    return (
        <div>
            {/* <div className="container-fluid"> */}
            <div className="row mx-0  text-center d-none d-md-block d-md-flex p-0">
                <div className="col-1 m-0">
                    <input type='checkbox' className="checkbox-wrapper" checked={ischecked}
                        onChange={(e) => { selectAll(e) }} />
                </div>
                <div className="col-1 mx-auto p-0">
                    <p className="text-uppercase">Images</p>
                </div>
                <div className="col-2 mx-auto p-0">
                    <p className="text-uppercase">Title</p>
                </div>
                <div className="col-1 mx-auto p-0">
                    <p className="text-uppercase">Price</p>
                </div>
                <div className="col-2 mx-auto p-0">
                    <p className="text-uppercase">Quantity</p>
                </div>
                <div className="col-1  mx-auto p-0">
                    <p className="text-uppercase">Remove</p>
                </div>
                <div className="col-1 mx-auto p-0">
                    <p className="text-uppercase">Total</p>
                </div>

            </div>
        </div>
        // </div>
    )
}

ListTitles.propTypes = {
    selectAll: PropTypes.func.isRequired,
    ischecked: PropTypes.bool
}

