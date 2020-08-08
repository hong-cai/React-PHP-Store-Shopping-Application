import React, { useState, useEffect } from 'react';

export const DateTimer = ({ seconds }) => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    const currentDate = date.toLocaleDateString();
    const [time, setTime] = useState({
        currentSeconds: parseInt(date.getSeconds())
    });


    useEffect(() => {
        const secondCount = setInterval(() => {
            setTime(preSecond => ({ currentSeconds: preSecond + 1 })
            )
        }, 1000);

        return () => {
            clearInterval(secondCount)
        }
    }, [time])


    return (
        <div>
            <h3>Hi,username,welcome,Today is {currentTime} {currentDate}
            </h3>
        </div>
    )
}