import React from 'react';
import { MdClose } from 'react-icons/md'

export const HoverCartSingle = (props) => {
    let { quantity, name } = props;
    return (
        <div><a href="/">{name} </a>
            <input type="text" name={name} onChange={props.onChange} defaultValue={quantity} style={{ width: '40px', margin: '5px', textAlign: 'center' }} />
            <span onClick={
                () => { console.log('clicked') }
            }><MdClose /></span>

        </div>
    )
}
export default HoverCartSingle;