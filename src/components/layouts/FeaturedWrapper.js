import styled from 'styled-components';

const FeaturedWrapper = styled.div`
            /* background: lightskyblue; */
            min-height: 60vh;
            display:grid;
            grid-template-columns:1fr minmax(max-content, max-content)  1fr;
            place-items:center;

i{
    font-size:2rem;
    cursor: pointer;
}

.horizontal-scroll-wrapper {
            background: pink;
            width: 90vw;
            height: 90%;          
            display:grid;
            place-items:center;
        }



        .horizontal-scroll-inner{
            display:flex;
            flex-direction:row;
            align-items:center;
            background:lightgreen;
            height:90%;
            width:100%;
            overflow-x:auto;
            overflow-y:hidden;
        }

        .horizontal-scroll-div {
            background: lightgoldenrodyellow;
            min-width:200px;
            margin:5px;
        } 
        .horizontal-scroll-div img{
            width:90%;
            padding:1%；
        }
`

export default FeaturedWrapper;