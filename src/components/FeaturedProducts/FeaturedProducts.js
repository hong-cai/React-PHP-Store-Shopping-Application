import React, { Component } from 'react';
import FeaturedWrapper from '../layouts/FeaturedWrapper';
import { Spring } from 'react-spring/renderprops';
import { ProductConsumer, ProductContext } from '../../ProductContext';
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
    //when the pages loads,timer starts and the slides move one product to the right
    slideNext = () => {
        this.setState({ activeIndex: ++this.state.activeIndex });
    }
    //when right arrow clicks,slides move one product to the right
    onNextClick = () => {
        this.pauseTimer();
        this.setState({ activeIndex: ++this.state.activeIndex }, () => { console.log(this.state.activeIndex) });
    }

    //when left arrow clicks,slides move one product left
    onPrevClick = () => {
        this.pauseTimer();
        if (this.state.activeIndex > 0) {
            this.setState({ activeIndex: --this.state.activeIndex });
        }
    }
    //when pages loads, timer starts
    startTimer = () => {
        this.timer = setInterval(() => this.slideNext(), 5000);
    }
    clearTimer = () => {
        clearInterval(this.timer);
    }
    //when mouse moves over the product div, timer pauses
    pauseTimer = () => {
        if (!this.state.paused) {
            this.clearTimer();
        }
        this.setState({
            paused: !this.state.paused
        })
    }
    //when mouse moves out the product div, timer resumes
    resumeTimer = () => {
        if (this.state.paused) {
            this.startTimer();
        }
        this.setState({
            paused: !this.state.paused
        })
    }

    componentDidUpdate = () => {
        //when the current carousel list is running out return to the beginning
        if (this.state.activeIndex >= (this.context.featuredProducts.length - 4)) {
            this.setState({
                activeIndex: 0
            })
        }
    }

    //when page loads, timer starts and the carousel automatically scrolls
    componentDidMount = () => {
        // this.startTimer();
    }

    render() {
        let sliderStyle = {
            // transform: `translateX(${this.state.activeIndex * -2}%)`,
            transform: `translateX(${this.state.activeIndex * -200}px)`,
            transition: '1s',
            transitionTimingFunction: 'cubic-bezier(.61,.01,.46,.95)'
        }
        return (
            <FeaturedWrapper>
                <ProductConsumer>
                    {value => {
                        const listLength = value.featuredProducts.length;
                        let carouselList = value.featuredProducts;
                        return (
                            <>
                                <span onClick={
                                    this.state.activeIndex < listLength ?
                                        () => { this.onPrevClick() } : null
                                }><FaChevronLeft />
                                </span>
                                <div className="horizontal-scroll-wrapper">
                                    <Scrollbars universal autoHide autoHideTimeout={1000}>
                                        <ul style={sliderStyle}
                                            onMouseEnter={this.pauseTimer}
                                            onMouseLeave={this.resumeTimer}
                                            className="horizontal-scroll-inner px-0 mb-0" >
                                            {
                                                [...carouselList].map(
                                                    (item, index) => <FeaturedProduct
                                                        key={index} item={item} />
                                                )
                                            }
                                        </ul>
                                    </Scrollbars>
                                </div>
                                <span onClick={
                                    this.state.activeIndex >= 0 ?
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
