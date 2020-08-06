import React from 'react';
import HoverCart from './sandbox/HoverCart';
import TestForm from './sandbox/TestForm';
import TestRef from './sandbox/TestRef';
import ClearTimer from './sandbox/ClearTimer';
import { SalesTimer } from './sandbox/SalesTimer';
import { DateTimer } from './sandbox/DateTimer';
import ClearTimerFunc from './sandbox/ClearTimerFunc';
import Carousel from './sandbox/Carousel';
import { ProductProvider } from './context';
import Dashboard from './sandbox/TestAdmin/Dashboard';
// import Chart from './sandbox/TestAdmin/Chart';
// import Deposits from './sandbox/TestAdmin/Deposits';
// import Orders from './sandbox/TestAdmin/Orders';
// import Title from './sandbox/TestAdmin/Title';


const Test = () => {
    return (
        <div>
            <ProductProvider>
                {/* <HoverCart /> */}
                {/* <TestForm /> */}
                {/* <TestRef /> */}
                {/* <ClearTimer />
            <ClearTimerFunc /> */}
                {/* <DateTimer /> */}
                {/* <SalesTimer seconds={10} /> */}
                {/* <Carousel /> */}

                <Dashboard />
            </ProductProvider>
        </div>
    )
}
export default Test;
