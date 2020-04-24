import React from 'react';




export const ListTitles = (props) => {
    // console.log('props.selectAll: ', props);
    const { selectAll, ischecked } = props;

    return (
        <div>
            <div className="container-fluid d-none text-center d-lg-block">
                <div className="row">
                    <div className="col-10 col-lg-1 m-0">
                        <input type='checkbox' className="checkbox-wrapper" checked={ischecked}
                            onChange={(e) => { selectAll(e) }} />
                    </div>
                    <div className="col-10 col-lg-1 mx-auto p-0">
                        <p className="text-uppercase">Images</p>
                    </div>
                    <div className="col-10 col-lg-1 mx-auto p-0">
                        <p className="text-uppercase">Title</p>
                    </div>
                    <div className="col-10 col-lg-1 mx-auto p-0">
                        <p className="text-uppercase">Price</p>
                    </div>
                    <div className="col-10 col-lg-2 mx-auto p-0">
                        <p className="text-uppercase">Quantity</p>
                    </div>
                    <div className="col-10 col-lg-1 mx-auto p-0">
                        <p className="text-uppercase">Remove</p>
                    </div>
                    <div className="col-10 col-lg-1 mx-auto p-0">
                        <p className="text-uppercase">Total</p>
                    </div>

                </div>
            </div>
        </div>
    )
}


