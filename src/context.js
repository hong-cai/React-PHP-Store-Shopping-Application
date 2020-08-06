import React, { Component } from 'react';
/* Directly Import An Array */
import { storeProducts, defaultProduct } from './data';
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

            /*featuredProducts on Home page*/
            featuredProducts: [],

            /*Dynamic product postName for single product info*/
            postName: "",
            /*details for single product display*/
            detailedProduct: defaultProduct,

            /*modal for Add To Cart button*/
            modalOpen: false,
            modalProduct: defaultProduct,

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
            user: {},

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

    //Check if user has logged in
    checkLoginStatus = () => {
        if (!sessionStorage.getItem('userData')) {
            this.setState({
                loggedIn: false,
                user: {}
            })
        } else {
            this.setState({
                loggedIn: true,
                user: sessionStorage.getItem('userData')
            }, localStorage.setItem('userData'))
        }
    }

    //function to be used by findDetails() and addToCart() modal
    getProduct = (products, id) => {
        const oneProduct = products.find(item => item.id == id);
        return oneProduct;
    };


    findDetails = postName => {
        const productDetail = this.state.products.find(item => item.postName === postName);
        console.log(productDetail);
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

    handleProductDetail = postName => {
        // console.log('clicked the image: ', postName);
        const thisProduct = this.findDetails(postName) != false ? this.findDetails(postName) : defaultProduct;
        this.setState(() => {
            return { detailedProduct: thisProduct }
        })
    }

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
        const addedProduct = this.getProduct(this.state.products, id);
        this.setState(() => {
            return {
                modalProduct: addedProduct,
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
        })

    }

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

    //Split large products array into limited number arrays and display when scrolling list
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
    // this following part is to copy the reference of data with objects as a new data list that won't change the original fresh data
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
                    item => {
                        console.log(item.id);
                        // Object.assign(item, { count: parseInt(newCount) })
                    }
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
                    handleLogin: this.handleLogin,
                    handleCount: this.handleCount,
                    handleProductDetail: this.handleProductDetail
                }}>
                    {this.props.children}
                </ProductContext.Provider>
            </React.Fragment>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer, ProductContext };