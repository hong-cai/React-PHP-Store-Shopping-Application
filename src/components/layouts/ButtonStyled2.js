import styled from 'styled-components';

const ButtonStyled2 = styled.button`
background:var(--main-dark);
font-size:1.1rem;
font-family: var(--title-font);
text-transform:capitalized;
border:1px solid var(--main-dark);
color:var(--main-background);
padding: .5rem;
transition:all 0.1s linear;
width:100%;
white-space:nowrap;
&: hover{
    background: transparent;
    color:var(--main-dark);
}
`

export default ButtonStyled2;