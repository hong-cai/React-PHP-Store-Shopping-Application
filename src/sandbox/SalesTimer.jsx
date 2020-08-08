import React, { useState, useEffect } from 'react';

export const SalesTimer = (props) => {

    // console.log(props.seconds);
    const allSeconds = props.seconds;
    let [secondsLeft, setsecondsLeft] = useState(allSeconds);



    const getSeconds = () => {
        if (secondsLeft <= 0) { secondsLeft = 0 };
        return ("0" + secondsLeft % 60).slice(-2);
    }

    const getMinutes = () => {
        let minutes = secondsLeft / 60;
        if (minutes <= 0) { minutes = 0 };
        return Math.floor(minutes);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            // console.log(secondsLeft);
            setsecondsLeft(prevSec => prevSec - 1)
        }, 1000)
        if (secondsLeft <= 0) {
            clearInterval(timer);
        }
        return () => {
            clearInterval(timer)
        }
    }, [secondsLeft]);


    return (
        <div>
            <h3>Sales Starts in <span>{getMinutes()}:{getSeconds()}</span></h3>
            {/* <h3>{secondsToTime()}</h3> */}

        </div >
    )
}
