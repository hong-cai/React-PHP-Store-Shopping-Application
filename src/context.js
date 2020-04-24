import React, { Component } from 'react';
/* Directly Import An Array */
import { storeProducts, detailProduct } from './data';
import { log } from 'util';
import axios from 'axios';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            cart: [],

            /*featuredProducts on Home page*/
            featuredProducts: [],

            /*details for single product display*/
            detailedProduct: detailProduct,

            /*modal for Add To Cart button*/
            modalOpen: false,
            modalProduct: "",

            /*cart summary*/
            cartSubTotal: 0,
            cartTax: 0,
            total: 0,

            /*filters configuration*/
            filteredProducts: [],
            category: "All",
            price: 0,
            maxPrice: 0,
            minPrice: 0,
            search: "",

            /*on-sale tag*/
            onSale: false,

            /*checkboxes for cart products*/
            checkoutCart: [],
            includeId: [],

            /*cart summary on hover*/
            cartHover: false,

            /*Login State*/
            loggedIn: false,
            user: {}
        };
    }

    handleLogin = (userData) => {
        sessionStorage.userData ?
            this.setState({
                loggedIn: true,
                user: userData
            }) :
            this.setState({
                loggedIn: false,
                user: {}
            })
    }

    handleLogout = () => {
        if (sessionStorage.getItem('userData')) {
            this.setState({
                loggedIn: false,
                user: {}
            }, sessionStorage.removeItem('userData'))
        };
    }

    checkLoginStatus = () => {
        axios.get('http://localhost/reactBegin/react-php/index.php?tp=login')
            .then(result => console.log(result))

        this.setState({
            loggedIn: true,
            user: sessionStorage.userData
        }, sessionStorage.removeItem('userData')
        )
    }

    //function to be used by findDetail() and addToCart() modal
    getProduct = (products, id) => {
        const oneProduct = products.find(item => item.id == id);
        return oneProduct;
    };


    findDetail = postName => {
        const productDetail = this.state.products.find(item => item.postName === postName);
        // console.log(productDetail);
        return productDetail;
    };

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
        console.log(oneProduct);
        let price = parseFloat(oneProduct.price);
        if (oneProduct.salePrice !== '') {
            price = parseFloat(oneProduct.salePrice)
        }

        let total = parseFloat(price * count).toFixed(2);
        oneProduct.total = total;


        if (this.getProduct(this.state.cart, id)) {
            // console.log([...this.state.cart]);
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

    openModal = id => {
        const oneProduct = this.getProduct(this.state.products, id);
        this.setState(() => {
            return {
                modalProduct: oneProduct,
                modalOpen: true
            };
        });
    };


    closeModal = () => {
        this.setState(() => {
            return {
                modalOpen: false
            }
        })
    }

    incrementItems = (id) => {
        console.log('clicked');
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
            console.log(tempCart);
        })

    }

    clearCart = () => {
        // console.log(this.state.cart);
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

    removeItem = (id) => {
        // console.log(this.state.cart);
        // console.log(id);
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


    taxTotal = () => {
        let tempCart = this.state.checkoutCart;
        // console.log('tempCart: ', tempCart);
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





    // this following part is to copy the reference of data with objects as a new data list that won't change the original fresh data
    componentDidMount() {
        // console.log(this.formatProductData(storeProducts));
        let products = this.formatProductData(storeProducts);
        let maxPrice = Math.max(...products.map(product => product.price));
        // console.log(maxPrice);
        let readCart = this.getCartFromStorage();
        let featuredProducts = products.filter(product => product.onSale === true);

        this.setState({
            products,
            filteredProducts: products,
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




    // componentDidUpdate() {
    //     let readCart = this.getCartFromStorage();
    //     this.setState({
    //         cart: readCart,
    //     })
    // }

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


    handleCount = (newCount) => {
        console.log(newCount);
        this.setState(() => (
            {
                cart: [...this.state.cart].map(
                    item => Object.assign(item, { count: parseInt(newCount) })
                )
            }
        ), () => { console.log(this.state.cart) })

    }
    // this.setState(prevState => ({
    //     counters: prevState.counters.map(
    //         counter => (counter.name === name ? Object.assign(counter, { 'name': name, 'quantity': parseInt(quantity) }) : counter)
    //     )
    // }));


    selectOneItem = (e) => {
        const { id, checked } = e.target;
        let selectedItem = this.state.cart.find(item => item.id == id);
        // console.log(e.target.id, e.target.checked);
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

        // console.log(filteredProducts);
        this.setState(
            () => {
                return {
                    filteredProducts,
                }
            }
        )
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
                    findDetail: this.findDetail,
                    modalOpen: this.openModal,
                    modalClose: this.closeModal,
                    incrementItems: this.incrementItems,
                    decrementItems: this.decrementItems,
                    clearCart: this.clearCart,
                    removeItem: this.removeItem,
                    taxTotal: this.taxTotal,
                    handleChange: this.handleChange,
                    saveCartToStorage: this.saveCartToStorage,
                    getCartFromStorage: this.getCartFromStorage,
                    findSalePrice: this.findSalePrice,
                    selectAll: this.selectAll,
                    selectOneItem: this.selectOneItem,
                    handleLogin: this.handleLogin,
                    handleCount: this.handleCount
                }}>
                    {this.props.children}
                </ProductContext.Provider>
            </React.Fragment>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer, ProductContext };