import styled from 'styled-components';

const ButtonStyled = styled.button`
background:transparent;
font-size:1.1rem;
text-transform:capitalize;
border:1px solid ${prop => prop.cart ? 'var(--main-color)' : 'var(--main-dark)'};
color:var(--main-black);
padding:1% 3%;
margin: .5rem;
transition:all 0.3s linear;
white-space:nowrap;
&: hover{
    background: ${prop => prop.cart ? 'var(--main-color)' : 'var(--main-dark)'};
    color:var(--main-background);
}
`

export default ButtonStyled;