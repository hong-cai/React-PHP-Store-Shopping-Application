import React, { Component } from 'react';
import FeaturedWrapper from '../components/layouts/FeaturedWrapper';
import { Spring } from 'react-spring/renderprops';
import { ProductConsumer, ProductContext } from '../context';
import range from "lodash/range";
import CarouselProduct from './CarouselProduct';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


export default class Carousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            featuredProducts: [],
            activeIndex: 0
        };
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


    componentDidMount = () => {
        // console.log(this.context.featuredProducts);
        // this.timer = setInterval(() => this.onNextClick(), 5000);
    }

    componentWillUnmount = () => {
        clearInterval(this.timer);
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

                    <ul style={sliderStyle}
                        //  style={props} 
                        className="horizontal-scroll-inner px-0" >
                        {/* {value => { console.log(value) }} */}
                        <ProductConsumer>
                            {value => {
                                return (
                                    value.featuredProducts.map(
                                        (item, index) => {
                                            return (
                                                <CarouselProduct
                                                    // className={computedClass}

                                                    key={index} item={item} />
                                            )
                                        }
                                    )
                                )
                            }}
                        </ProductConsumer>
                    </ul>
                    {/* } */}
                    {/* </Spring> */}
                </div>
                <span onClick={this.onNextClick}><FaChevronRight /></span>
            </FeaturedWrapper >
        )
    }

}
Carousel.contextType = ProductContext;
