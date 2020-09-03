import React, { Component } from 'react';
/* Directly Import An Array */
import { storeProducts, defaultProduct } from './data';
import PropTypes from 'prop-types';
import { log } from 'util';
import axios from 'axios';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /*Products and cart before loading*/
            products: [],
            cart: [],

            /*Loading loader and limited products list*/
            loading: true,
            limit: 12,
            page: 0,

            /*FeaturedProducts on Home page*/
            featuredProducts: [],

            /*Dynamic product postName for single product info*/
            postName: '',
            /*Details for single product display*/
            detailedProduct: defaultProduct,

            /*Modal for Add To Cart button*/
            modalOpen: false,
            modalProduct: defaultProduct,
            modalContent: 'AddToCartModal',

            /*Cart summary*/
            cartSubTotal: 0,
            cartTax: 0,
            total: 0,

            /*Filters configuration*/
            filteredProducts: [],
            category: "All",
            price: 0,
            maxPrice: 0,
            minPrice: 0,
            search: "",

            /*On-sale tag*/
            onSale: false,

            /*Checkboxes for cart products*/
            checkoutCart: [],
            includeId: [],

            /*Cart summary on hover*/
            cartHover: false,

            /*Login State*/
            loggedIn: false,
            alert: null,
            user: {},
            users: [
                {
                    id: 1,
                    name: 'aaaa',
                    email: 'aaaa@test.com',
                    password: 'aaaa'
                },
                {
                    id: 2,
                    name: 'bbbb',
                    email: 'bbbb@test.com',
                    password: 'bbbb'
                },
            ]
        };
    }

    /****************************
     * Login/Validation/Logout
     * ************************** */

    validateUser = (userData) => {
        const users = this.state.users;
        let matchEmail = users.find(user => user.email === userData.email);
        let matchPass = users.find(user => user.password === userData.password);
        if (!matchEmail || !matchPass) {
            this.setState({
                alert: { msg: 'Email or password does not match the record. Please try again.', type: 'danger' },
                loggedIn: false,
            });
        } else if (matchEmail && matchPass) {
            this.setState({
                alert: { msg: 'Login Success', type: 'success' },
                loggedIn: true,
                user: userData,
            }, () => { this.saveUser(userData) })
        }
    }
    //Handle  Signup:
    handleSignup = (userData) => {
        let oldUsers = this.state.users;
        let newUsers = [...oldUsers, userData]
        this.setState({
            users: newUsers
        })
    }

    // Login user
    loginLocalData = (userData) => {
        console.log('here in context');
        this.validateUser(userData);
    };

    // Logout user
    handleLogout = () => {
        if (sessionStorage.getItem('loggedInUser')) {
            this.setState({
                loggedIn: false,
                user: {}
            }, sessionStorage.removeItem('loggedInUser'))
        };
    }

    //Check if user has logged in
    checkLoginStatus = () => {
        if (!sessionStorage.getItem('loggedInUser')) {
            this.setState({
                loggedIn: false,
                user: {}
            })
        } else {
            this.setState({
                loggedIn: true,
                user: sessionStorage.getItem('loggedInUser')
            })
        }
    }

    //Save user in the sessionStorage
    saveUser = (userData) => {
        sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
    }

    /****************************
     * Get Single Product Info
     * ************************** */
    //Function to be used by findDetails() and addToCart() modal
    getProduct = (products, id) => {
        const oneProduct = products.find(item => item.id == id);
        return oneProduct;
    };

    //One product detail after click each product link
    findDetails = postName => {
        const productDetail = this.state.products.find(item => item.postName === postName);
        return productDetail ? productDetail : false;
        // console.log(productDetail);
        /*********************
         * Real find product detail: Post Data to Server and get response
         * ******************/
        // searchDetail=async userID=>{
        //     const response = await axios.get(
        //         `https//api/users?q=${userID}?client_id=${SECRET}`
        //     );
        //     this.setState({user:response.data,loading:false})
        // }
    };

    // "/products/postName": dynamic link to each product and display info
    handleProductDetail = postName => {
        // console.log('clicked the image: ', postName);
        const thisProduct = this.findDetails(postName) != false ? this.findDetails(postName) : defaultProduct;
        this.setState(() => {
            return { detailedProduct: thisProduct }
        })
    }


    /****************************
     * Add Item To The Cart
     * ************************** */
    //NOT JUST ADD ONE ITEM TO CART BUT THE WHOLE CART 
    addOneItemToCart = (id) => {
        let newCart = [];
        let tempCart = [...this.state.cart];
        let tempProducts = [...this.state.products];
        // console.log('tempcart: ', tempCart);
        // console.log('tempProduct: ', tempProducts);
        let oneProduct = this.getProduct(tempCart, id) ? this.getProduct(tempCart, id) : this.getProduct(tempProducts, id);
        let count = ++oneProduct.count;
        oneProduct.inCart = true;
        let price = parseFloat(oneProduct.price);
        if (oneProduct.salePrice !== '') {
            price = parseFloat(oneProduct.salePrice)
        }

        let total = parseFloat(price * count).toFixed(2);
        oneProduct.total = total;


        if (this.getProduct(this.state.cart, id)) {
            newCart = [...this.state.cart];
        } else {
            newCart = [...this.state.cart, oneProduct];
        }
        this.setState(
            () => {
                return {
                    products: tempProducts,
                    cart: newCart
                };
            },
            //Callback Function As Second Parameter
            () => {
                // console.log(this.state);
                // cart button, +, -, trash-icon need:
                this.saveCartToStorage(newCart);
            }
        )
    };



    /**************************
     *             Modal
     * ************************ */
    //Add To Cart:pass id and open modal to confirm
    openModal = id => {
        const addedProduct = this.getProduct(this.state.products, id);
        this.setState(() => {
            return {
                modalProduct: addedProduct,
                modalOpen: true
            };
        });
    };

    //Add To Cart:close modal
    closeModal = () => {
        this.setState(() => {
            return {
                modalOpen: false
            }
        })
    }


    /*************************************
     * Increase/Remove Item/ Clear Cart
     * ********************************** */
    // Cart: increase item numbers
    incrementItems = (id) => {
        let tempCart = [...this.state.cart];
        let selectedProduct = this.getProduct(tempCart, id);
        let index = tempCart.indexOf(selectedProduct);
        let tempProduct = tempCart[index];
        tempProduct.count = tempProduct.count + 1;
        tempProduct.total = (tempProduct.count * tempProduct.price).toFixed(2);
        this.setState({
            cart: [...tempCart]
        }, () => {
            this.saveCartToStorage(tempCart);
        })
    }

    // Cart: reduce item numbers
    decrementItems = (id) => {
        let tempCart = this.state.cart;
        let selectedProduct = this.getProduct(tempCart, id);
        const index = tempCart.indexOf(selectedProduct);
        let tempProduct = tempCart[index];
        tempProduct.count > 1 ? tempProduct.count = tempProduct.count - 1 :
            tempProduct.count = 1;

        tempProduct.total = (tempProduct.count * tempProduct.price).toFixed(2);

        this.setState({
            cart: tempCart
        }, () => {
            this.saveCartToStorage(tempCart);
        })

    }
    // Cart: empty cart
    clearCart = () => {
        this.state.cart.forEach(
            product => {
                product.count = 0;
                product.inCart = false;
                product.total = 0
            }
        )
        this.setState(
            {
                cart: [],
                itemChecked: []
            }
        )
    }

    //Cart and HoverCart: remove one item
    removeItem = (id) => {
        let newCart = [...this.state.cart];
        let currProduct = this.getProduct(newCart, id);
        currProduct.count = 0;
        currProduct.total = 0;
        newCart = newCart.filter(item => item.id !== id);
        console.log(newCart);
        this.setState(
            {
                cart: [...newCart]
            },
            () => {
                this.saveCartToStorage(newCart);
            }
        )
    }

    //Cart: CartTotal, calculate total tax
    taxTotal = () => {
        let tempCart = this.state.checkoutCart;
        let tempSubTotal = 0;
        tempCart.map(item => { tempSubTotal += parseFloat(item.total); });
        let subTotal = tempSubTotal.toFixed(2);
        let cartTax = (subTotal * .15).toFixed(2);
        let total = (parseFloat(subTotal) + parseFloat(cartTax)).toFixed(2);
        // console.log(typeof (total));
        this.setState(
            {
                cartSubTotal: subTotal,
                cartTax: cartTax,
                total: total
            }
        )
    }

    //Cart: select all items in the cart and update CartTotal
    selectAll = (e) => {
        let checkoutCart = [...this.state.cart];
        let includeId = this.state.includeId;
        if (e.target.checked) {
            for (const item of checkoutCart) {
                includeId.push(item.id);
            }
        }

        if (e.target.checked) {
            this.setState({
                checkoutCart,
                includeId,
            }, () => { this.taxTotal() })
        } else {
            this.setState({
                checkoutCart: [],
                includeId: [],
            },
                // () => { console.log(checkoutCart); }
                () => { this.taxTotal() }
            )
        }
    };

    //Cart: select one item and update the CartTotal
    selectOneItem = (e) => {
        const { id, checked } = e.target;
        let selectedItem = this.state.cart.find(item => item.id == id);
        if (checked) {
            this.setState(
                prevState => (
                    {
                        checkoutCart: [...prevState.checkoutCart, selectedItem],
                        includeId: [...prevState.includeId, selectedItem.id]
                    }
                ), () => { this.taxTotal() })
        } else {
            this.setState(prevState => ({
                checkoutCart: prevState.checkoutCart.filter(item => item.id != selectedItem.id),
                includeId: prevState.includeId.filter(id => id != selectedItem.id)
            }), () => { this.taxTotal() })
        }
    }



    /*************************************
     *  Save/Remove Item from LocalStorage
     * ********************************** */
    // Save Item To LocalStorage
    saveCartToStorage = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
        // console.log(localStorage);
    }

    // Get Item From LocalStorage
    getCartFromStorage = () => {
        let cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        let cart = [...cartItems];
        return cart;
    }






    /*************************************
     * Unlimited Scroll List 
     * ********************************** */
    //Split large products array into limited number chunks and display when scrolling list
    separateProducts = (products) => {
        console.log(products);
        let limit = 12;
        //Divide the products list into smaller array with 12 items each
        let newList = [];
        for (var i = 0; i < products.length; i += limit) {
            var oneItem = products.slice(i, i + limit);
            newList.push(oneItem);
        }
        return newList;
    }

    //Scroll and load smaller list
    loadSmallList = (products, page) => {
        let newList = this.separateProducts(products);
        let loadedProducts = newList[page];
        return loadedProducts;
    }


    waitForResult = (products, page, seconds) => {
        return new Promise(resolve => {
            let loadedProducts = this.loadSmallList(products, this.state.page);
            if (page < loadedProducts.length) {
                setTimeout(resolve(loadedProducts), seconds).then(console.log(loadedProducts));
            } else {
                resolve([]);
            }
        })
    }

    wait = async (products, page, seconds = 1000) => {
        let loadedProducts = await this.waitForResult(products, page, seconds);
        this.setState(prevPage => ({
            page: ++prevPage,
            filteredProducts: loadedProducts,
            loading: false
        }), console.log(this.state.filteredProducts))
    }

    loadProducts = (products, page) => {
        window.addEventListener('scroll', () => {
            console.log(products, page);
            debugger;
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 12) {
                console.log(products);
                // this.wait(products, page)
            }
        })
    }
    hideLoader = () => {
        this.setState({
            loading: false
        })
    }

    componentDidMount() {
        let products = this.formatProductData(storeProducts);
        // let detailedProduct = this.handleProductDetail(this.state.postName);
        // let thisProduct = this.findDetails(postName);
        // let loadedProducts = this.wait(this.formatProductData(storeProducts), this.state.page);
        let maxPrice = Math.max(...products.map(product => product.price));
        let readCart = this.getCartFromStorage();
        let featuredProducts = products.filter(product => product.onSale === true);
        // let addedProducts = this.loadProducts(this.state.filteredProducts, this.state.page);
        this.setState({
            products,
            //filteredProducts for filter
            filteredProducts: products,

            //pagedProducts for split product list
            featuredProducts,
            maxPrice,
            price: maxPrice,
            cart: readCart,
            // cart: products
        }
            // () => { console.log(this.state.cart) }
        );
        this.checkLoginStatus();
    }



    //Data.js: get json data and format into 
    formatProductData = (products) => {
        let tempProducts = products.map(product => {
            let id = product.ID;
            let title = product.post_title;
            let postName = product.post_name;
            let images = product.images;
            let price = product.regular_price !== "" ? parseFloat(product.regular_price).toFixed(2) : 'Please Inquire';
            let category = product.product_cat;
            let info = product.post_content;
            let productSku = product.sku;
            let productBrief = product.post_excerpt;
            let inCart = product.in_cart;
            let count = product.count;
            let total = price * count;
            let onSale = product.on_sale;
            let salePrice = product.sale_price;
            let singleProduct = { id, title, postName, images, price, category, info, productSku, productBrief, inCart, total, count, onSale, salePrice };
            return singleProduct;
        });
        return tempProducts;
    }



    // testUpdate=()=>{
    //     console.log('State products: ', this.state.product[0].inCart)
    //     console.log('data product: ', storeProducts[0].inCart)
    //     const changeData=[...this.state.product]
    //     changeData[0].inCart=false
    //     this.setState(()=>{
    //         return {product:changeData}
    //     },()=>{
    //         console.log('State products: ',this.state.product[0].inCart)
    //         console.log('data product: ',storeProducts[0].inCart)
    //     }

    //     )
    // }


    handleChange = (element) => {
        let { value, name, type, checked } = element.target;
        value = type === "checkbox" ? checked : value;
        // console.log(type, name, value);

        this.setState(
            {
                [name]: value
            },
            () => {
                this.filterProducts()
            }
        )
    }

    //HoverCart in Navbar: Update the input number
    handleCount = (e) => {
        const newCount = e.target.value;
        this.setState({
            cart: this.state.cart.map(item =>
                item.id === parseInt(e.target.id) ? { ...item, count: parseInt(newCount) } : item
            )
        })
    }



    /*********************
     * Shop: Filter
     * ******************/
    filterProducts = () => {
        // console.log(this.state.category);
        const { products, category, maxPrice, minPrice, onSale, search } = this.state;
        let filteredProducts = [...products];


        // console.log(filteredProducts);
        filteredProducts = filteredProducts.filter(
            product => {
                const { title } = product;
                const searchTitle = title.toLowerCase();
                const searchInfo = search.toLowerCase();
                // console.log(infoArray);
                return searchTitle.indexOf(searchInfo) !== -1
            }
        )

        if (category !== 'All') {
            filteredProducts = filteredProducts.filter(product => {
                // console.log(`${this.state.category}`);
                return product.category.includes(`${category}`)
            })
        }


        filteredProducts = filteredProducts.filter(product => {
            const price = parseFloat(product.price);
            return price >= minPrice && price <= maxPrice
        }
        )


        if (onSale === true) {
            filteredProducts = filteredProducts.filter(product => product.onSale === true)
        }

        this.setState(
            () => {
                return {
                    filteredProducts,
                }
            }
        )

        /*********************
         * In Real filter case: Post Data to Server and get response
         * ******************/
        // searchSth=async text=>{
        //     const response = await axios.get(
        //         `https//api/search/users?q=${text}&client_id=${SECRET}`
        //     );
        //     this.setState({users:response.data.items,loading:false})
        // }
    }





    findSalePrice = (id) => {
        let tempCart = this.state.cart;
        let saleProduct = tempCart.find(item => item.id === id);
        return saleProduct.salePrice;
    }

    render() {
        return (
            <React.Fragment>
                {/* <button onClick={this.testUpdate}>Test Update</button> */}
                <ProductContext.Provider value={{
                    ...this.state,
                    addOneItemToCart: this.addOneItemToCart,
                    toggleModalOpen: this.openModal,
                    toggleModalClose: this.closeModal,
                    incrementItems: this.incrementItems,
                    decrementItems: this.decrementItems,
                    clearCart: this.clearCart,
                    removeItem: this.removeItem,
                    taxTotal: this.taxTotal,
                    handleChange: this.handleChange,
                    findDetails: this.findDetails,
                    saveCartToStorage: this.saveCartToStorage,
                    getCartFromStorage: this.getCartFromStorage,
                    findSalePrice: this.findSalePrice,
                    selectAll: this.selectAll,
                    selectOneItem: this.selectOneItem,
                    loginLocalData: this.loginLocalData,
                    handleLogout: this.handleLogout,
                    checkLoginStatus: this.checkLoginStatus,
                    handleCount: this.handleCount,
                    handleProductDetail: this.handleProductDetail,
                }}>
                    {this.props.children}
                </ProductContext.Provider>
            </React.Fragment>
        )
    }
}
ProductProvider.propTypes = {
    users: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
        email: PropTypes.string,
        password: PropTypes.string,
    }),
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
    }),

    products: PropTypes.arrayOf(PropTypes.object),
    cart: PropTypes.arrayOf(PropTypes.object),

    /*Loading and limited products list*/
    loading: PropTypes.bool,
    limit: PropTypes.number,
    page: PropTypes.number,

    /*FeaturedProducts on Home page*/
    featuredProducts: PropTypes.arrayOf(PropTypes.object),
    postName: PropTypes.string,
    modalOpen: PropTypes.bool,
    cartSubTotal: PropTypes.number,
    cartTax: PropTypes.number,
    total: PropTypes.number,

    /*Filters configuration*/
    filteredProducts: PropTypes.arrayOf(PropTypes.object),
    category: PropTypes.string,
    price: PropTypes.number,
    maxPrice: PropTypes.number,
    minPrice: PropTypes.number,
    search: PropTypes.string,

    /*On-sale tag*/
    onSale: PropTypes.bool,

    /*Checkboxes for cart products*/
    checkoutCart: PropTypes.arrayOf(PropTypes.object),
    includeId: PropTypes.arrayOf(PropTypes.object),

    /*Cart summary on hover*/
    cartHover: PropTypes.bool,

    /*Login State*/
    loggedIn: PropTypes.bool,

    addOneItemToCart: PropTypes.func,
    toggleModalOpen: PropTypes.func,
    toggleModalClose: PropTypes.func,
    incrementItems: PropTypes.func,
    decrementItems: PropTypes.func,
    clearCart: PropTypes.func,
    removeItem: PropTypes.func,
    taxTotal: PropTypes.func,
    handleChange: PropTypes.func,
    findDetails: PropTypes.func,
    saveCartToStorage: PropTypes.func,
    getCartFromStorage: PropTypes.func,
    findSalePrice: PropTypes.func,
    selectAll: PropTypes.func,
    selectOneItem: PropTypes.func,
    loginLocalData: PropTypes.func,
    checkLoginStatus: PropTypes.func,
    handleCount: PropTypes.func,
    handleProductDetail: PropTypes.func

}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer, ProductContext };







/*********************
 * Get Data From Server:fetch API
 * ******************/

    // componentDidMount(){
    //     fetch("https://host")
    //     .then(result=>reslt.json())
    //     .then(products=>this.setState({products}))
    // }


/*********************
 * Get Data From Server: ASYNC await/promise Syntacs
 * ******************/
    // async componentDidMount() {
    //     const products = (await fetch("https://host")).json();
    //     this.setState({ products })
    // }


/*********************
 * Get Data From Server: use axios
 * ******************/
    // async componentDidMount() {
    //     const products = await axios.get('http://dir').then(response=>console.log(response.data));
    //     this.setState({ products })
    // }