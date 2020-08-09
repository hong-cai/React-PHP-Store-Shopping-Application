import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Redirect(props) {



    // console.log(props.seconds);
    const allSeconds = props.seconds;
    let [secondsLeft, setsecondsLeft] = useState(allSeconds);



    const getSeconds = () => {
        if (secondsLeft <= 0) { secondsLeft = 0 };
        return ("0" + secondsLeft % 60).slice(-2);
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
        <div className="container" >
            <div className="row" >
                <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
                    <div className='text-left text-success alert alert-light mx-0'>
                        <h5> Login/Signup success!</h5><br />
                        <h6> You will be redirect in <span className="text-danger">{getSeconds()}</span> seconds</h6>
                    </div>
                    <Link to="/">Redirect</Link>
                </div>
            </div>
        </div>
    )
}
