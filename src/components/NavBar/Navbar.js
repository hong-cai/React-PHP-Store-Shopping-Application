import React, { useState, useEffect, useContext, useRef, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ButtonStyled3 from '../layouts/ButtonStyled3';
import ButtonStyled from '../layouts/ButtonStyled';
import NavWrapper from '../layouts/NavWrapper';
import { ProductContext, ProductConsumer } from '../../ProductContext';
import { NavHoverSingle } from '../NavBar/NavHoverSingle';
import { MdFilterList } from 'react-icons/md';
import { GiHeartPlus } from 'react-icons/gi';
import { FaShoppingCart } from 'react-icons/fa';
import { Scrollbars } from 'react-custom-scrollbars';
import { NotFound } from '../NotFound';
import PropTypes from 'prop-types';

const Navbar = (props) => {
    const [hoverCart, setHoverCart] = useState(false);
    const hoverCartRef = useRef();
    const NavbarContext = useContext(ProductContext);
    // console.log(NavbarContext);
    useEffect(() => {
        document.addEventListener('click', (e) => collapseNavHover(e));
    })

    const collapseNavHover = (e) => {
        if (hoverCartRef.current && hoverCartRef.current.contains(e.target)) {
            return;
        }
        closeHoverCart();
    }



    const handleMouseOver = () => {
        setHoverCart(true);
    }

    const closeHoverCart = () => {
        setHoverCart(false);
    };

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
                        <NavLink to='../products'>Products</NavLink>
                    </li>
                    <li className='nav-item ml-4'>
                        <NavLink to='../shop'>Shop</NavLink>
                    </li>
                    <li className='nav-item ml-7'>
                        <ProductConsumer>
                            {
                                value => {
                                    let loginState = value.loggedIn;
                                    const handleLogout = value.handleLogout;
                                    return (
                                        < NavLink to={loginState ? '../user/details' : '../user/login'} >
                                            <ButtonStyled className="px-4 py-1 text-info" onClick={
                                                () => {
                                                    loginState && handleLogout()
                                                }
                                            }
                                            >{loginState ? 'Logout' : 'Login'}</ButtonStyled>
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
                        <FaShoppingCart className='navbar-cart mr-2' onMouseOver={handleMouseOver} />

                        <ProductConsumer>
                            {value => {
                                let cartLength = value.cart.length > 0 ? value.cart.length : 0;
                                let count = value.cart.map(item => item.count);
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
                </NavLink>{hoverCart === false ? null : (
                    <div className="hover-cart-wrapper" ref={hoverCartRef}>
                        <div className="hover-cart">
                            <ProductConsumer>
                                {value => {
                                    return value.cart.length > 0 ? (<ul className="d-flex flex-column justify-content-flex-end">
                                        <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
                                            {value.cart.map(
                                                product => <NavHoverSingle key={product.id} removeItem={value.removeItem} extractProps={product} onChange={value.handleCount} />
                                            )}
                                        </Scrollbars>
                                        <NavLink to='../cart'>
                                            <ButtonStyled3 className="shopping-cart-btn text-center">
                                                <h4>Checkout</h4>
                                            </ButtonStyled3>
                                        </NavLink></ul>
                                    ) :
                                        (<div className="overflow-hidden d-flex flex-column justify-content-center"><NotFound message="Nothing In The Cart" />
                                            <NavLink to='../../Shop'>
                                                <ButtonStyled3 className="shopping-cart-btn">
                                                    <h5>Go Shopping</h5>
                                                </ButtonStyled3></NavLink></div>);
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                )

                }
            </div>



        </NavWrapper >
    );
}

Navbar.propTypes = {
    hoverCart: PropTypes.bool
}

export default Navbar;