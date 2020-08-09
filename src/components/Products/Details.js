import React, { Component } from 'react';
import ButtonStyled2 from '../layouts/ButtonStyled2';
import ButtonStyled3 from '../layouts/ButtonStyled3';
import ReactHtmlParser from 'react-html-parser';
import { BackToShopBtn } from '../BackToShopBtn';
import { ProductConsumer } from '../../ProductContext';
import { NotFound } from '../NotFound';
import { Link } from 'react-router-dom';


class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postName: ''
        }
    }

    componentDidMount() {
        let postName = this.props.match.params.postName ? this.props.match.params.postName : '';
        this.setState({
            postName
        })
    }



    render() {
        return (
            <div>
                {this.state.postName.length > 0 ?
                    (<ProductConsumer>
                        {
                            value => {
                                let product = value.findDetails(this.state.postName);
                                let modalOpen = value.modalOpen;
                                let { toggleModalOpen, addOneItemToCart } = value;
                                const { id, title, images, postName, price, onSale, salePrice, inCart, category, info } = product;
                                if (product) {
                                    return (
                                        <div>
                                            <div className="container">
                                                <BackToShopBtn location='Shop' />
                                            </div>
                                            <div className="container container-md-fluid">
                                                <div className="row d-flex flex-column flex-md-row">
                                                    {/* <!-- Left Column / Headphones Image --> */}
                                                    <div className="left-column col-md-5 w-100">
                                                        <img src={process.env.PUBLIC_URL + `/img/${images}`} alt={title} />
                                                    </div>

                                                    {/* <!-- Right Column --> */}
                                                    <div className="right-column col-md-7 w-100">

                                                        {/* <!-- Product Description --> */}
                                                        <div className="product-description">
                                                            <span>{category}</span>
                                                            <h2>{title}</h2>
                                                            {/* <!-- Product Pricing --> */}
                                                            <div className="product-price">
                                                                <span>{price}</span>
                                                            </div>
                                                            <div className="py-3">
                                                                {ReactHtmlParser(info)}
                                                            </div>
                                                        </div>
                                                        <div className="buttons">
                                                            <div>
                                                                <ButtonStyled3 onClick={() => {
                                                                    addOneItemToCart(id);
                                                                    toggleModalOpen(id);
                                                                }}
                                                                    data-target="#productModal">Add to cart</ButtonStyled3>
                                                            </div>
                                                            <div>
                                                                <Link to="/cart">
                                                                    <ButtonStyled2>Buy Now</ButtonStyled2></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    );
                                } else {
                                    return (
                                        <NotFound message="No product is found" />
                                    )

                                }
                            }
                        }
                    </ProductConsumer>)
                    : null
                }
            </div>
        )
    }
}

export default Details