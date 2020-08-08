import React, { Component } from 'react';
import FeaturedWrapper from '../layouts/FeaturedWrapper';
import { Spring } from 'react-spring/renderprops';
import { ProductConsumer, ProductContext } from '../../context';
import range from "lodash/range";
import FeaturedProduct from './FeaturedProduct';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Scrollbars } from 'react-custom-scrollbars';


export default class FeaturedProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            paused: false,
        };
    }

    backToFirst = (length) => {
        if (this.state.activeIndex >= length - 5) {

        }
    }

    onNextClick = () => {
        this.setState(() => ({
            activeIndex: this.state.activeIndex += 1
        }));
    }

    onPrevClick = () => {
        this.setState({ activeIndex: this.state.activeIndex - 1 });
    }

    startTimer = () => {
        this.timer = setInterval(() => this.onNextClick(), 5000);
    }
    clearTimer = () => {
        clearInterval(this.timer);
    }
    pauseTimer = () => {
        if (!this.state.paused) {
            this.clearTimer();
        }
        this.setState({
            paused: !this.state.paused
        })
    }
    resumeTimer = () => {
        if (this.state.paused) {
            this.startTimer();
        }
        this.setState({
            paused: !this.state.paused
        })
    }

    componentDidMount = () => {
        let value = this.context;
        // return value.featuredProducts.map(item => console.log(item));
        this.onNextClick();
        this.startTimer();
    }

    componentWillUnmount = () => {
        this.clearTimer();
    }

    render() {
        let sliderStyle = {
            // transform: `translateX(${this.state.activeIndex * -2}%)`,
            transform: `translateX(${this.state.activeIndex * -200}px)`,
            transition: '2s',
            transitionTimingFunction: 'cubic-bezier(.61,.01,.46,.95)'
        }
        return (

            <FeaturedWrapper>
                <ProductConsumer>
                    {value => {
                        let carouselList = value.featuredProducts;
                        const listLength = carouselList.length;
                        return (
                            <>
                                <span onClick={
                                    this.activeIndex < listLength ?
                                        () => { this.onPrevClick() } : this.pauseTimer
                                }><FaChevronLeft />
                                </span>
                                <div className="horizontal-scroll-wrapper">
                                    <Scrollbars universal autoHide autoHideTimeout={1000}>
                                        <ul style={sliderStyle}
                                            onMouseEnter={this.pauseTimer}
                                            onMouseLeave={this.resumeTimer}
                                            className="horizontal-scroll-inner px-0 mb-0" >
                                            {
                                                carouselList.map(
                                                    (item, index) => <FeaturedProduct
                                                        key={index} item={item} />
                                                )
                                            }

                                        </ul>
                                    </Scrollbars>
                                </div>
                                <span onClick={
                                    this.state.activeIndex > 0 ?
                                        () => { this.onNextClick() } : null
                                }><FaChevronRight /></span>

                            </>
                        )
                    }}
                </ProductConsumer>
            </FeaturedWrapper >
        )
    }
}
FeaturedProducts.contextType = ProductContext;
