import styled from 'styled-components';

const FeaturedWrapper = styled.div`
            background: lightskyblue;
            display:grid;
            place-items:center;
i{
    font-size:2rem;
    cursor: pointer;
}

.horizontal-scroll-wrapper {
            background: pink;
            width: 1000px;
            height: 300px;          
            display:grid;
            place-items:center;
        }



        .horizontal-scroll-inner{
            display:flex;
            flex-direction:row;
            align-items:center;
            background:lightgreen;
            height:100%;
            width:100%;
            overflow-x:auto;
            overflow-y:hidden;
        }

        .horizontal-scroll-div {
            background: lightgoldenrodyellow;
            min-width:150px;
            margin:5px;
            padding:5px;
        } 
        
        .horizontal-scroll-div img{
            width:100px;
            padding:1%;
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
                width:640px
            }
            
        }
        @media (max-width: 768px) {
            .horizontal-scroll-wrapper {
                width:480px
            }
            
        }
        @media (max-width: 576px) {
            .horizontal-scroll-wrapper {
                width:200px;
                .horizontal-scroll-div{
                    margin:auto 25px;
                }
            }
            
        }
`

export default FeaturedWrapper;