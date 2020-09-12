import styled from 'styled-components';

const FeaturedWrapper = styled.div`
            margin:5% auto;
            /* background: lightskyblue; */
            justify-self:center;
            display:grid;
            grid-template-columns:30px auto 30px;
            place-items:center;
            max-width:88%;
            
span {
    width:30px;
    height:60px;
    align-self:center;
    font-size:2rem;
    cursor: pointer;
    color:var(--main-shade);
    transition:all .2s ease;
    :hover{
        color:var(--main-dark);
        background:var(--main-shade);
    }
}

.horizontal-scroll-wrapper {
            /* background: pink; */
            width: 1000px;
            height: 300px;          
            display:grid;
            place-items:center;
            /* overflow-x:auto; */
            overflow-y:hidden;
        }

        .horizontal-scroll-inner{
            display:flex;
            flex-direction:row;
            align-items:center;
            /* background:lightgreen; */
            height:100%;
            width:100%;
        }

        .horizontal-scroll-div {
            background: lightgoldenrodyellow;
            width:160px;
            margin:auto 20px;
        } 
        
        .horizontal-scroll-div img{
            width:100%;
        }
        .horizontal-scroll-div .discount{
            display:none;
        }

        @media (max-width: 1200px) {
            .horizontal-scroll-wrapper {
                width:800px
            }
        }
        @media (max-width: 991px) {
            .horizontal-scroll-wrapper {
                width:600px
            }
            
        }
        @media (max-width: 768px) {
            .horizontal-scroll-wrapper {
                width:400px
            }
            
        }
        @media (max-width: 576px) {
            .horizontal-scroll-wrapper {
                width:200px;
            }
            
        }
`

export default FeaturedWrapper;