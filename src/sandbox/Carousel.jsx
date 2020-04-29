import React, { Component, useContext } from 'react';
import FeaturedWrapper from '../components/layouts/FeaturedWrapper';
import { Spring } from 'react-spring/renderprops';
import { ProductConsumer, ProductContext } from '../context';
import range from "lodash/range";
import CarouselProduct from './CarouselProduct';


export default class Carousel extends Component {

    constructor(props) {
        super(props);
        this.featuredRef = React.createRef();
        this.state = {
            activeIndex: 0
        };
    }

    onNextClick = () => {
        if (this.state.activeIndex < 50) {
            this.setState({ activeIndex: this.state.activeIndex + 1 });
        } else {
            this.setState({ activeIndex: 0 })
        }
    }

    onPrevClick() {
        if (this.state.activeIndex > 0) {
            this.setState({ activeIndex: this.state.activeIndex - 1 });
        } else {
            this.setState({ activeIndex: 50 })
        }
    }



    featuredScroll = () => {
        console.log('scroll');
        // const speed = 1;
        // console.log(this.featuredRef.current.offsetLeft);
        // console.log(this.featuredRef.current.offsetWidth);
        // console.log(this.featuredRef.current.style.left);
        // console.log(this.featuredRef.scrollLeft);
        let ul = this.featuredRef.current;
        // ul.style.left = 0;
        // ul.offsetLeft-=1;
        // ul.innerHTML = ul.innerHTML + ul.innerHTML;
        // if (ul.offsetLeft < -ul.offsetWidth / 2) {
        //     ul.style.left = '0';
        // }
        // ul.offsetLeft = ul.offsetLeft - 1;
        // ul.style.left = ul.offsetLeft;
    };
    getFeaturePorducts = () => {
        const featuredProducts = useContext(ProductContext);
    }


    componentDidMount = () => {
        let timer = setInterval(this.onNextClick, 1000);
        this.onNextClick();
        console.log('scroll');
    }

    render() {
        let sliderStyle = {
            transform: `translateX(${this.state.activeIndex * -100}%)`,
            transition: '0.2s'
        }
        return (
            <FeaturedWrapper>
                {/* <span onClick={this.prevProduct}><i className="fa fa-chevron-left"></i> </span> */}
                <div className="horizontal-scroll-wrapper">
                    {/* <Spring
                        from={{ opacity: 0 }}
                        to={{ opacity: 1 }}
                    > */}
                    {/* {props =>  */}
                    <ul
                        ref={this.featuredRef}
                        //  style={props} 
                        className="horizontal-scroll-inner px-0" >
                        <ProductConsumer>
                            {/* {value => { console.log(value) }} */}
                            {value => {
                                return (
                                    value.featuredProducts.map(
                                        (item, index) => {
                                            let computedClass = index === (this.state.activeIndex) ? 'slide active' : 'slide';
                                            return (
                                                <CarouselProduct
                                                    // className={computedClass}
                                                    style={sliderStyle}
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
                {/* <span onClick={this.nextProduct}><i className="fa fa-chevron-right"></i>  </span> */}
            </FeaturedWrapper>
        )
    }

}

