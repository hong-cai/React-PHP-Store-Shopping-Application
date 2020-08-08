import React, { useState } from 'react';
import ButtonStyled2 from './layouts/ButtonStyled2';
import ButtonStyled3 from './layouts/ButtonStyled3';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { BackToShopBtn } from './BackToShopBtn';
import { ProductConsumer } from '../context';


import PropTypes from 'prop-types';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postName: this.props.match.params.postName,
        }

    }

    render() {
        return (
            <div>
                <ProductConsumer>
                    {
                        value => {
                            value.handle
                            const { images, price, title, category, info, id } = value.detailedProduct;
                            return (
                                <div className="container container-fluid-lg d-flex flex-column">
                                    <BackToShopBtn />
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
                                                    <span>{price}</span>
                                                </div>
                                                <div>
                                                    {ReactHtmlParser(info)}
                                                </div>
                                            </div>
                                            <div className="buttons">
                                                <div>
                                                    <ButtonStyled3
                                                    // onClick={value.addOneItemToCart(id)}
                                                    >Add to cart</ButtonStyled3>
                                                </div>
                                                <div>
                                                    <ButtonStyled2>Buy Now</ButtonStyled2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );


                        }
                    }
                </ProductConsumer>
            </div>
        );
    }
}

Details.propTypes = {

}



// const Details = (props) => {
//     const [postName, setPostName] = useState(props.match.params.postName);

//     //this way is wrong, because the postName is not stored(in this component rather than the context state), it will be gone when page refreshed.
//     console.log(contextType);
//     const detailedProduct = this.context.findDetail(postName);
//     console.log('detailedproduct: ', detailedProduct);
//     const { images, price, title, category, info, id } = detailedProduct;
//     const addOneItemToCart = this.context.addOneItemToCart(id);
//     // console.log(title);
//     if (!detailedProduct) {
//         return (
//             <h3>No such product</h3>)
//     }
//     return (
//         <div className="container container-fluid-lg d-flex flex-column">
//             <BackToShopBtn />
//             <div className="row">
//                 {/* <!-- Left Column / Headphones Image --> */}
//                 <div className="left-column">
//                     <img src={images} alt={title} />
//                 </div>

//                 {/* <!-- Right Column --> */}
//                 <div className="right-column">

//                     {/* <!-- Product Description --> */}
//                     <div className="product-description">
//                         <span>{category}</span>
//                         <h2>{title}</h2>
//                         {/* <!-- Product Pricing --> */}
//                         <div className="product-price">
//                             <span>${price}</span>
//                         </div>
//                         <div>
//                             {ReactHtmlParser(info)}
//                         </div>
//                     </div>
//                     <div className="buttons">
//                         <div>
//                             <ButtonStyled3 onClick={addOneItemToCart(id)
//                             }>Add to cart</ButtonStyled3>
//                         </div>
//                         <div>
//                             <ButtonStyled2>Buy Now</ButtonStyled2>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div >




//     )
// }
//     static contextType = ProductContext;
export default Details;
