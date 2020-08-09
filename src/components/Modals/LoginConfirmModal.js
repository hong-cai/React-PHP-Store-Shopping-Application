import React from 'react';
import Redirect from '../Redirect';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../../ProductContext';
import ModalStyled from '../layouts/ModalStyled';
import ButtonStyled from '../layouts/ButtonStyled';
import Textblock from '../Textblock';
import { AiOutlineClose } from 'react-icons/ai';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';

const LoginConfirmModal = () => {
    return (
        <ModalStyled>
            <div className="container bg-light py-4 d-flex flex-column position-relative">
                <div className="row d-flex flex-row flex-end">
                    <Redirect seconds={5} />
                </div>

                <span className="position-absolute top-0 h3 pull-right text-lg"
                // onClick={() => { toggleModalClose() }}
                ><AiOutlineClose />
                </span>
            </div>

        </ModalStyled>
    )
}


export default LoginConfirmModal
