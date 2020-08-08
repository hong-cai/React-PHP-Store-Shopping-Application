import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NavWrapper from '../components/layouts/NavWrapper';
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
                <div className="d-flex">
                    <div className="logo">hello</div>
                    <ul className='navbar-nav align-items-center'>
                        <li className='nav-item ml-4'>
                            <NavLink to='../'>Home</NavLink>
                        </li>
                        <li className='nav-item ml-4'>
                            <NavLink to='../about'>About</NavLink>
                        </li>
                        <li className='nav-item ml-4'>
                            <NavLink to='../products'>Products</NavLink>
                        </li>
                        <li className='nav-item ml-4'>
                            <NavLink to='../shop'>Shop</NavLink>
                        </li>
                        <li className='nav-item ml-7'>

                        </li>

                    </ul>
                </div>
                <div>
                    <NavLink to='../cart'>
                        <span className='bg-light'>
                            <FaShoppingCart className='navbar-cart mr-2' onMouseOver={this.handleMouseOver} onMouseLeave={this.handleDocClick} />
                            <div className="cart-items">4</div>
                        </span>
                    </NavLink>
                    {this.state.hoverCart ? (
                        <div> {/* Hover Icon To See Cart Products */}
                            <div className="hover-cart-wrapper" style={{ background: 'red' }}
                                // onClick={this.stopPropa} 
                                onClick={this.bubbleup} ref={node => this.node = node}
                            >
                                <div className="hover-cart" style={{ background: 'salmon' }}>

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


