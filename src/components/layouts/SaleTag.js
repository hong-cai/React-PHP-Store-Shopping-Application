import styled from 'styled-components';

const SaleTag = styled.div`
            text-align: center;
            align-items:center;
            letter-spacing:.2rem;
            z-index: 2;
            border-bottom: 2rem solid var(--main-color);
            border-left: 2rem solid transparent;
            border-right: 2rem solid transparent;
            height: 0;
            width: 8rem;
            transform: rotate(45deg);
            position: absolute;
            top: 1.1rem;
            right: -2rem;  
            font-family: 'Oswald', sans-serif;
            font-size:1.3rem;
            color:var(--main-red);
            font-weight:normal;
            box-shadow:0 2px rgba(0,0,0,.2);
            `

export default SaleTag;