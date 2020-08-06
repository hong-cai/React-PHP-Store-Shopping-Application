import styled from 'styled-components';

const ButtonStyled = styled.button`
background:transparent;
text-transform:capitalize;
min-width:80px;
border:2px solid ${prop => prop.cart ? 'var(--main-color)' : 'var(--main-dark)'};
color:var(--main-black);
padding:1% 5%;
margin: .5rem;
transition:var(--main-transition);
white-space:nowrap;
&: hover{
    background: ${prop => prop.cart ? 'var(--main-color)' : 'var(--main-dark)'};
    color:var(--main-background);
}
`

export default ButtonStyled;