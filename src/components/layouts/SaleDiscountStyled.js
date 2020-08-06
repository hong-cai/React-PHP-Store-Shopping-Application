import styled from 'styled-components';

const SaleDiscountStyled = styled.div`
display:flex;
.price-div{
    display:flex;
    flex-direction:row;
    .reg-price{
    text-decoration:line-through;
    text-decoration-color:var(--main-red);
}
.reg-disprice{
    color:var(--main-red);
}
}



.discount {
    position: relative;
    left: 10px;
    background: var(--main-red);
    border-radius: 3px;
    height: 1.2rem;
}

.discount:before {
    content: '';
    position: absolute;
    /* width: 14px;
            height: 30px;
            background: red; */
    top: 8px;
    left: -8px;
    border-top: 3px solid transparent;
    border-right: 8px solid var(--main-red);
    border-bottom: 3px solid transparent;
}

.discount p {
    font-size: .7rem;
    margin: 0;
    padding: 0 3px;
    color: var(--main-background);
}
`;

export default SaleDiscountStyled;