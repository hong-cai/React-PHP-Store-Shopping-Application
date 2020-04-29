import styled from 'styled-components';


const NavWrapper = styled.nav`
    background:var(--main-color);
    color:var(--main-bright);
    position: sticky;
    top: 0;
    z-index: 5
    span{
        /* background:green; */
        font-size:1.5rem;
        position:relative;
    }

    .navbar-list
    {
        font-size:2rem;
        cursor: pointer;
    /* display:none;     */
    }
    
    .cart-items{
        position: absolute;
        top: -8px;
        right: -8px;
        background:var(--main-background);
        padding: 0 6px;
        border-radius: 20%;
        color: var(--main-dark);
        font-size:1rem;
        font-family:'Roboto';
    }

    .logo{
        font-family: 'Pacifico', cursive;
        text-transform: capitalize;
    }

    .logo svg{
        color:var(--main-red);
    }

    .logo p{
        margin:0;
    }

.nav-item:nth-child(5){
text-transform:capitalize;
}


    

    /* --------Hover Cart-------- */
    .hover-cart-wrapper{
        position:absolute;
        right:0;
        /* background:pink; */
        width:360px;
    }
    .hover-cart {
        color:var(--main-dark);
      /* visibility:visible; */
    position: relative;
    background: var(--light-color);
    min-width: 350px;
    width: 30%;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 20px;
    margin: 5px;
    right:0;
    z-index: 4;
    font-size:1rem;
    text-transform:capitalize;
    border:1px solid var(--light-color)
}
.hover-cart:before{
        content:'';
        width:0;
    height: 0;
    /* background:green; */
    border-bottom: 10px solid var(--light-color);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    position: absolute;
    top:-8px;
   right:50px;
    bottom: -10px; 
    }


    .close-hover{
        position:absolute;
        top:1%;
        right:11%;
        font-size:1.2rem;
    }

    .hover-cart-details {
    display: grid;
    grid-template-columns: 2.5fr 0.5fr;
    border-bottom:1px dotted var(--main-background);
    
}

.hover-cart-item {
    display: grid;
    grid-template-columns:1fr 2fr 1fr;
    align-items: center;
    margin: 10px 0;
}

.hover-cart-item input{
    text-align:center;
    width:40px;
}


.arrow {
    width: 0;
    height: 0;
    border-bottom: 10px solid moccasin;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    position: absolute;
    left: 50%;
    top: 0px;
}

.img-div {
    width: 60px;
    height: auto;
}

.img-div img {
    max-width: 100%;
    padding: 10px;
}


.hover-cart-item-details {
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    padding:0;
}

.hover-cart-item-details .hover-title{
    /* background:orange; */
    text-transform:capitalize;
    color:var(--main-dark);
    font-size:1rem;
    text-overflow: ellipsis;
    overflow: hidden;
}

.hover-cart-item-details .reg-price{
    /* background:pink; */
    padding:0;
    margin:0;
}

.remove {
    display:grid;
    place-items:center;
    font-size:1rem;
    cursor: pointer;
}



/* --------End of Hover Cart-------- */

    a {
  text-decoration: none;
  text-transform:uppercase;
  color:var(--main-dark);
  font-size:1.2rem;
}



`;

export default NavWrapper;