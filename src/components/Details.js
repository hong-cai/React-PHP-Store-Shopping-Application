import React, { Component } from 'react';
import Title from './Title';
import TitleStyled from './layouts/TitleStyled';
import { ProductConsumer } from '../context';
import ButtonStyled2 from './layouts/ButtonStyled2';
import ButtonStyled3 from './layouts/ButtonStyled3';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { BackToShopBtn } from './BackToShopBtn';
import { ProductContext } from '../context';

export default class Details extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.state = {
            postName: this.props.match.params.postName
        }
    }

    static contextType = ProductContext;
    //this way is wrong, because the postName is not stored(in this component rather than the context state), it will be gone when page refreshed.
    render() {
        const detailedProduct = this.context.findDetail(this.state.postName);
        // console.log('detailedproduct: ', detailedProduct);
        // console.log(title);
        if (!detailedProduct) {
            return (
                <h3>No such product</h3>)
        }
        const { images, price, title, category, info } = detailedProduct;
        return (
            <div className="container container-fluid-lg">
                <div className="row">
                    {/* <!-- Left Column / Headphones Image --> */}
                    <div className="left-column">
                        <img src={images} alt={title} />
                    </div>

                    {/* <!-- Right Column --> */}
                    <div className="right-column">

                        {/* <!-- Product Description --> */}
                        <div className="product-description">
                            <span>{category}</span>
                            <h2>{title}</h2>
                            {/* <!-- Product Pricing --> */}
                            <div className="product-price">
                                <span>${price}</span>
                            </div>
                            <div>
                                {ReactHtmlParser(info)}
                            </div>
                        </div>
                        <div className="buttons">
                            <div>
                                <ButtonStyled3>Add to cart</ButtonStyled3>
                            </div>
                            <div>
                                <ButtonStyled2>Buy Now</ButtonStyled2>
                            </div>
                        </div>
                    </div>
                </div>
            </div >




        )
    }
}
