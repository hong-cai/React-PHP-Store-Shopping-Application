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
            featuredProducts: [],
            activeIndex: 0,
            paused: false,
            /* Loading State */
            loading: false,
        };
    }

    getFeaturedProducts = () => {

    }

    onNextClick = (length) => {
        // if (this.state.activeIndex < length) {
        this.setState(() => ({
            activeIndex: this.state.activeIndex += 1
        }));
        // } else {
        //     this.setState({ activeIndex: 0 })
        // }
    }

    onPrevClick(length) {
        if (this.state.activeIndex > 0) {
            this.setState({ activeIndex: this.state.activeIndex - 1 });
        } else {
            this.setState({ activeIndex: length })
        }
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
            // console.log('clear');
        }
        this.setState({
            paused: !this.state.paused
        })
    }
    resumeTimer = () => {
        if (this.state.paused) {
            this.startTimer();
            // console.log('resume');
        }
        this.setState({
            paused: !this.state.paused
        })
    }

    componentDidMount = () => {

        this.setState({ loading: true });
        let value = this.context;
        // let featuredProducts = value.featuredProducts;
        // return value.featuredProducts.map(item => console.log(item));
        // this.setState({
        //     featuredProducts: value.featuredProducts
        // }, console.log(this.state.featuredProducts))
        // this.startTimer();

    }

    componentWillUnmount = () => {
        this.clearTimer();
    }

    render() {
        let sliderStyle = {
            // transform: `translateX(${this.state.activeIndex * -2}%)`,
            transform: `translateX(${this.state.activeIndex * -200}px)`,
            transition: '2s'
        }
        return (

            <FeaturedWrapper>
                <span onClick={this.onPrevClick}><FaChevronLeft /></span>
                <div className="horizontal-scroll-wrapper">
                    {/* <Spring
                        from={{ opacity: 0 }}
                        to={{ opacity: 1 }}
                    > */}
                    <Scrollbars universal autoHide autoHideTimeout={1000}>
                        <ul style={sliderStyle}
                            onMouseOver={this.pauseTimer}
                            onMouseLeave={this.resumeTimer}
                            className="horizontal-scroll-inner px-0 mb-0" >
                            {/* {value => { console.log(value) }} */}
                            <ProductConsumer>
                                {value => {
                                    return (
                                        value.featuredProducts.map(
                                            (item, index) => {
                                                return (
                                                    <FeaturedProduct
                                                        // className={computedClass}

                                                        key={index} item={item} />
                                                )
                                            }
                                        )
                                    )
                                }}
                            </ProductConsumer>
                        </ul>
                    </Scrollbars>
                    {/* } */}
                    {/* </Spring> */}
                </div>
                <span onClick={this.onNextClick}><FaChevronRight /></span>
            </FeaturedWrapper >
        )
    }
}
FeaturedProducts.contextType = ProductContext;
