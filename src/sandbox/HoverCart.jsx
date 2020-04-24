import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import NavWrapper from '../components/layouts/NavWrapper';
import { AiOutlineClose } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import HoverCartSingle from './HoverCartSingle';


export default class HoverCart extends Component {
    constructor(props) {
        super(props);
        // this.hoverRef = React.createRef();
        this.state = {
            hoverCart: false,
            counters: [
                { 'name': 'product1', 'quantity': 3 },
                { 'name': 'product2', 'quantity': 1 },
                { 'name': 'product3', 'quantity': 5 }
            ]

        }
    }

    handleMouseOver = () => {
        this.setState({
            hoverCart: true
        })
    }



    handleChange = (e) => {
        const name = e.target.name;
        const quantity = e.target.value;
        // console.log(counters);
        this.setState(prevState => ({
            counters: prevState.counters.map(
                counter => (counter.name === name ? Object.assign(counter, { 'name': name, 'quantity': parseInt(quantity) }) : counter)
            )
        }));
    }




    closeHoverCart = () => {
        this.setState({
            hoverCart: false
        })
    }



    componentDidMount() {
        document.addEventListener('click', (e) => this.stopCapture(e))
    }

    testClick = (e) => {
        console.log('click: ', e.target)
    }

    stopCapture = (e) => {
        // console.log('from document to inside');
        // console.log(this.node);
        if (this.node && this.node.contains(e.target)) {
            return;
        }
        this.closeHoverCart();
    }

    render() {
        return (
            <NavWrapper className='navbar navbar-expand-sm navbar-dark px-sm-5 justify-content-between'>
                <div

                >
                    <NavLink to='../cart'>
                        <span className='ml-5 mr-0'>
                            <FaShoppingCart className='navbar-cart mr-2' onMouseOver={this.handleMouseOver} onMouseLeave={this.handleDocClick} />

                        </span>
                        {/* <div className="arrow"></div> */}
                    </NavLink>
                    {this.state.hoverCart ? (
                        <div> {/* Hover Icon To See Cart Products */}
                            <div className="hover-cart-wrapper" style={{ background: 'red' }}
                                // onClick={this.stopPropa} 
                                onClick={this.bubbleup} ref={node => this.node = node}
                            >
                                <div className="hover-cart" style={{ background: 'salmon' }}>
                                    <div className="close-hover" onClick={this.closeHoverCart} > <AiOutlineClose /> </div>
                                    {
                                        this.state.counters.map(
                                            (counter, index) => (
                                                <HoverCartSingle key={index} name={counter.name} onChange={this.handleChange} quantity={counter.quantity} />
                                            )
                                        )
                                    }
                                </div>
                            </div>
                            {/*End Of Hover Icon To See Cart Products */}</div>
                    ) : (null)}
                </div>



            </NavWrapper>
        );
    }
}


