import React, { useRef, useState } from 'react';

export const HoverCartSingle = (props) => {
    let { quantity, name } = props;
    return (
        <div><a>{name} </a>
            <input type="text" name={name} onChange={props.onChange} defaultValue={quantity} style={{ width: '40px', margin: '5px', textAlign: 'center' }} />
        </div>
    )
}
export default HoverCartSingle;