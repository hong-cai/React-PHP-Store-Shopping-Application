import React, { useContext, useEffect, Component } from 'react';
import { Redirect } from 'react-router-dom';
import ProductList from './ProductList';
import Title from '../Title';
import Textblock from '../Textblock';
import { NotFound } from '../NotFound';
import { Details } from '../Details';
import { ProductContext, ProductConsumer } from '../../context';

import PropTypes from 'prop-types'

class Products extends Component {
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
                    <ProductConsumer>
                        {
                            value => {
                                let product = value.findDetails(this.state.postName);
                                let modalOpen = value.modalOpen;
                                let { toggleModalOpen, addOneItemToCart } = value;

                                if (product) {
                                    return (
                                        <Details product={product}
                                            modalOpen={modalOpen}
                                            toggleModalOpen={toggleModalOpen}
                                            addOneItemToCart={addOneItemToCart}
                                        />
                                    )
                                } else {
                                    return (
                                        <NotFound message="No product is found" />
                                    )

                                }
                            }
                        }
                    </ProductConsumer>
                    : (<><Title title="main products" name="our" /><Textblock content="Best hygiene products for the hard time" /><ProductList /></>)}
            </div>
        )
    }
}

Products.propTypes = {
    postName: PropTypes.string,
}

export default Products