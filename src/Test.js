import React from 'react';
import HoverCart from './sandbox/HoverCart';
import TestForm from './sandbox/TestForm';
import TestRef from './sandbox/TestRef';
import ClearTimer from './sandbox/ClearTimer';
import { SalesTimer } from './sandbox/SalesTimer';
import { DateTimer } from './sandbox/DateTimer';
import ClearTimerFunc from './sandbox/ClearTimerFunc';

const Test = () => {
    return (
        <div>
            <HoverCart />
            {/* <TestForm /> */}
            {/* <TestRef /> */}
            {/* <ClearTimer />
            <ClearTimerFunc /> */}
            {/* <DateTimer /> */}
            <SalesTimer seconds={10} />
        </div>
    )
}
export default Test;
