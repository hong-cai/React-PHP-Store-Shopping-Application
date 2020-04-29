import React, { Component } from 'react';
import FeaturedWrapper from '../components/layouts/FeaturedWrapper';
import { Spring } from 'react-spring/renderprops';
import { ProductConsumer } from '../context';
import range from "lodash/range";
import FeaturedProduct from './FeaturedProduct';


export default class FeaturedProducts extends Component {

    constructor(props) {
        super(props);
        this.featuredRef = React.createRef();
        this.state = {
            left: 0
        };
    }

    nextProduct = (event) => {
        const widthOfScrolling = 1;
        const widthOfSlide = 200;
        var newPos = this.featuredRef.current.scrollLeft + (widthOfSlide * widthOfScrolling);
        this.featuredRef.current.scrollLeft = newPos;

    }

    prevProduct = (event) => {
        const widthOfScrolling = 1;
        const widthOfSlide = 200;
        var newPos = this.featuredRef.current.scrollLeft - (widthOfSlide * widthOfScrolling);
        this.featuredRef.current.scrollLeft = newPos;
    }

    featuredScroll = () => {
        console.log('scroll');
        const speed = 1;
        // console.log(this.featuredRef.current.offsetLeft);
        // console.log(this.featuredRef.current.offsetWidth);
        // console.log(this.featuredRef.current.style.left);
        // console.log(this.featuredRef.scrollLeft);
        const ul = this.featuredRef.current;
        ul.innerHTML = ul.innerHTML + ul.innerHTML;
        if (ul.offsetLeft < -ul.offsetWidth / 2) {
            ul.style.left = '0';
        }
        ul.style.left = ul.offsetLeft - speed + "px";

    };


    componentDidMount = () => {
        // const timer = setInterval(this.featuredScroll, 100);
        // this.featuredScroll();
    }

    render() {
        return (
            <FeaturedWrapper >
                <span onClick={this.prevProduct}><i className="fa fa-chevron-left"></i> </span>
                <div className="horizontal-scroll-wrapper">
                    {/* <Spring
                        from={{ opacity: 0 }}
                        to={{ opacity: 1 }}
                    > */}
                    {/* {props =>  */}
                    <ul ref={this.featuredRef}
                        //  style={props} 
                        className="horizontal-scroll-inner px-0" >
                        <ProductConsumer>
                            {value => {
                                {/* console.log(value); */ }
                                return (
                                    value.featuredProducts.map(
                                        item => {
                                            return (
                                                <FeaturedProduct key={item.id} item={item} />
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
                <span onClick={this.nextProduct}><i className="fa fa-chevron-right"></i>  </span>
            </FeaturedWrapper>
        )
    }

}

