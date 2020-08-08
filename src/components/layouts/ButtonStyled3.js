import styled from 'styled-components';

const ButtonStyled3 = styled.button`
background:var(--main-color);
font-size:1.1rem;
text-transform:capitalized;
font-family: var(--title-font);
border:1px solid var(--main-color);
color:var(--main-background);
padding: .5rem;
transition:all 0.1s linear;
width:100%;
white-space:nowrap;
text-align:center;
&: hover{
    filter: brightness(97%);
    color:var(--main-dark);
}
`;

export default ButtonStyled3;