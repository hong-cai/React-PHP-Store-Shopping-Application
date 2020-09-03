import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar/Navbar';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import AddToCartModal from './components/Modals/AddToCartModal';
import LoginConfirmModal from './components/Modals/LoginConfirmModal';
import Home from './Home';
import About from './About';
import Account from './Auth/Account';
import AccountInfo from './Auth/AccountInfo';
import User from './Auth/User';
import Error from './Error';
import Details from './components/Products/Details';
import Shop from './Shop';
import Default from './components/Default';
import { ProductProvider } from './ProductContext';


class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ProductProvider>
          <Navbar />
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/about' component={About} />
            {/* <Route path='/contact' component={Contact} /> */}
            <Route path='/shop' component={Shop} />
            <Route path='/cart' component={Cart} />
            <Route exact path='/user/details' component={AccountInfo} />
            <Route exact path='/user' component={User} />
            <Route exact path='/user/login' component={Account} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/products/:postName' component={Details} />
            <Route component={Default} />
          </Switch>
          <AddToCartModal />
          {/* <LoginConfirmModal /> */}
        </ProductProvider>
      </React.Fragment>
    )
  }
}

export default App;
