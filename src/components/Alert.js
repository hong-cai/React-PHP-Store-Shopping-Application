import React from 'react'

const Alert = (props) => {
    const { alert } = props;
    return (
        alert !== null && (
            <p className={`alert alert-${alert.type}`}>
                <i className="fa fa-info-circle">{alert.msg}</i>
            </p>
        )
    )
}
export default Alert