import React, { useEffect, useRef } from 'react';


function TestRef() {
    const inputRef = useRef(null);
    useEffect(() => {
        console.log(inputRef);
        console.log(inputRef.current);
        inputRef.current.focus();
    }, []);
    return (
        <div>
            <input ref={inputRef} type="text" />
        </div>
    )
}

export default TestRef
