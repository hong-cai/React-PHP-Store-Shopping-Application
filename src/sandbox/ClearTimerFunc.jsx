import React, { useRef, useState, useEffect } from 'react';

const ClearTimerFunc = () => {
    const [timer, setTimer] = useState(0);
    const timerRef = useRef();


    useEffect(() => {
        timerRef.current = setInterval(
            () => {
                setTimer((prevState) => (prevState + 1
                ));
            }, 1000);
        return () => {
            clearInterval(timerRef.current);
        }
    }, [])






    return (
        <div>
            Class Timer-{timer}
            <input type="button" value="clear interval" onClick={() => { clearInterval(timerRef.current) }} />
        </div>
    )
}

export default ClearTimerFunc;