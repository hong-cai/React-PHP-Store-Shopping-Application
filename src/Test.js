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

const Test = () => {
    return (
        <div>
            <ProductProvider>
                <HoverCart />
                {/* <TestForm /> */}
                {/* <TestRef /> */}
                {/* <ClearTimer />
            <ClearTimerFunc /> */}
                {/* <DateTimer /> */}
                <SalesTimer seconds={10} />
                <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{ height: '400px', background: '#f3f3f3' }}>
                    <Carousel />
                </div>
            </ProductProvider>
        </div>
    )
}
export default Test;
