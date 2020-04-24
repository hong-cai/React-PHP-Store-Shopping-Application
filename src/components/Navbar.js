import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ButtonStyled3 from './layouts/ButtonStyled3';
import ButtonStyled2 from './layouts/ButtonStyled2';
import NavWrapper from './layouts/NavWrapper';
import { ProductConsumer } from '../context';
import { NavHoverSingle } from './NavHoverSingle';
import { MdFilterList } from 'react-icons/md';
import { GiHeartPlus } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        // this.hoverRef = React.createRef();
        this.state = {
            hoverCart: false
        }
    }


    componentDidMount() {
        document.addEventListener('click', (e) => this.collapseNavHover(e))
    }



    collapseNavHover(e) {
        console.log('this.node', this.node, 'contains', e.target, this.node.contains(e.target));
        if (this.node && this.node.contains(e.target)) {
            return;
        }
        this.closeHoverCart();
    }

    handleMouseOver = () => {
        this.setState({
            hoverCart: true
        })
    }



    closeHoverCart = () => {
        this.setState({
            hoverCart: false
        })
    }

    render() {
        return (
            <NavWrapper className='navbar navbar-expand-sm navbar-dark px-sm-5 justify-content-between'>
                <div className="d-flex">
                    <Link to='../'>
                        <div className="logo">
                            <span><GiHeartPlus />Hygiene Care</span>
                        </div>
                    </Link>
                    <ul className='navbar-nav align-items-center'>
                        <li className='nav-item ml-4'>
                            <NavLink to='../'>Home</NavLink>
                        </li>
                        <li className='nav-item ml-4'>
                            <NavLink to='../about'>About</NavLink>
                        </li>
                        <li className='nav-item ml-4'>
                            <NavLink to='../contact'>contact</NavLink>
                        </li>
                        <li className='nav-item ml-4'>
                            <NavLink to='../shop'>Shop</NavLink>
                        </li>
                        <li className='nav-item ml-4'>
                            <ProductConsumer>
                                {
                                    value => {
                                        let loginState = value.loggedIn;
                                        const handleLogin = value.handleLogin;
                                        return (
                                            < NavLink to={loginState ? '../cart' : '../account'} >
                                                <ButtonStyled2 onClick={handleLogin} className="px-3 py-1">{loginState ? 'Logout' : 'Acount'}</ButtonStyled2>
                                            </NavLink>
                                        )
                                    }


                                }




                            </ProductConsumer>

                        </li>
                    </ul>
                </div>
                <div className="navbar-list d-md-none">
                    <MdFilterList />
                </div>

                <div>
                    <NavLink to='../cart'>
                        <span className='ml-5 mr-0'>
                            <FaShoppingCart className='navbar-cart mr-2' onMouseOver={this.handleMouseOver} onMouseLeave={this.handleDocClick} />
                            <ProductConsumer>
                                {value => {
                                    {/* console.log(value.cart); */ }
                                    let cartLength = value.cart.length > 0 ? value.cart.length : 0;
                                    {/* console.log(value.cart); */ }
                                    const count = value.cart.map(item => item.count);
                                    return (
                                        <div className="cart-items">
                                            {
                                                count.reduce((total, num) => { return total += num || 0 }, 0)
                                            }
                                        </div>
                                    )
                                }}
                            </ProductConsumer>

                        </span>
                        {/* <div className="arrow"></div> */}
                    </NavLink>
                    {this.state.hoverCart ? (
                        <div> {/* Hover Icon To See Cart Products */}
                            <div className="hover-cart-wrapper" ref={node => this.node = node}>
                                <div className="hover-cart">
                                    <div className="close-hover" onClick={this.closeHoverCart} > < AiOutlineClose /> </div>
                                    <ProductConsumer>
                                        {value => {
                                            {/* console.log(value); */ }
                                            return value.cart.length > 0 ? (
                                                <div>
                                                    {value.cart.map(
                                                        product => <NavHoverSingle key={product.id} removeItem={value.removeItem} extractProps={product} handleCount={value.handleCount} />
                                                    )}
                                                    <NavLink to='../cart'>
                                                        <ButtonStyled3 className="shopping-cart-btn">
                                                            Go To Cart
            </ButtonStyled3>
                                                    </NavLink>
                                                </div>
                                            ) :
                                                (<><h5>There is nothing in ur shopping cart</h5>
                                                    <ButtonStyled3 className="shopping-cart-btn">
                                                        Go Shopping
            </ButtonStyled3></>);
                                        }}
                                    </ProductConsumer>
                                </div>
                            </div>
                            {/*End Of Hover Icon To See Cart Products */}</div>

                    ) : (null)}
                </div>



            </NavWrapper >
        );
    }
}

