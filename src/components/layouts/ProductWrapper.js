import styled from 'styled-components'

const ProductWrapper = styled.div`
    
    .img-container{
        position:relative;
        overflow:hidden;
    }
    .cart-img-top{
        transition:all 0.5s linear;
    }
    .img-container:hover .cart-img-top{
        transform:scale(1.2);
    }


    .img-container:hover .cart-btn{
        background:var(--light-color);
        padding:0.7rem;
        font-size:1.4rem;
        transform:translate(0,0)
    }

    .card-select:hover{
        box-shadow:0 2px 10px rgba(0,0,0,.2);
    }
    a {
  text-decoration: none;
  color:var(--main-dark);
}
`

export default ProductWrapper;