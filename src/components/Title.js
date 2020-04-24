import React from 'react';

const Title=({name,title})=>{
    return (
        <div className="row">
            <div className="col-10 mx-auto my-2 text-center text-title">
                {name}<strong className='text-orange'>{title}</strong>
            </div>
        </div>
    )
}

export default Title