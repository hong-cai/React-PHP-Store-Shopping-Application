<React.Fragment>
    <div>
        <p>{id}</p>
        <p>{title}</p>
        <p>{img}</p>
    </div>
</React.Fragment>




    <ProductConsumer>
        {
            value => {
                return (
                    value.product.map(
                        item => {
                            // console.table(item.id)
                            return (
                                <Product key={item.id} id='{item.id}' product={item} addToCart={value.addToCart} />
                            )
                        }
                    )
                )
            }
        }
    </ProductConsumer>





    <ProductConsumer>
        {(value) => {
            //                     const { id, title, images, price, category, info, productBrief, productSku, inCart } = value.detailedProduct;
            //                     return (
            //                         <React.Fragment>
            //                             <div className="container py-5">
            //                                 {/* back to products button */}
            //                                 <BackToShopBtn />

            //                                 {/* info row */}
            //                                 <div className="row">
            //                                     <div className="col-3 col-sm-5 col-md-5 col-lg-3">

            //                                         {/* image */}
            //                                         <div className="img-fluid">
            //                                             <img src={images} alt={title} width='100%' />
            //                                         </div>
            //                                     </div>
            //                                     <div className="info-container col-5 col-sm-5 col-md-6 col-lg-6">

            //                                         {/* title */}
            //                                         <TitleStyled>{title}</TitleStyled>

            //                                         {/* price */}
            //                                         <h4>${price}
            //                                         </h4>

            //                                         {/* company and details */}
            //                                         <h5>Category: {category} </h5>
            //                                         <h5 className="text-muted">Details:
            // </h5>
            //                                         <h6 className="text-muted"><b>{ReactHtmlParser(productBrief)}</b> <br />
            //                                             {ReactHtmlParser(info)}</h6>
            //                                         {/* buttons */}
            //                                         <div className='d-flex justify-content-center'>
            //                                             <ButtonStyled id={id} className='text-capitalize'>buy now</ButtonStyled>
            //                                             <ButtonStyled
            //                                                 id={id}
            //                                                 onClick={() => {
            //                                                     value.addOneItemToCart(id);
            //                                                     // value.openModal(id);
            //                                                 }}
            //                                                 cart={inCart ? 'true' : 'false'}
            //                                                 className='text-capitalize'
            //                                                 disabled={inCart ? true : false} dataToggle='modal' dataTarget='#add-to-cart-modal'>{inCart ? 'in cart' : 'add to cart'}</ButtonStyled>
            //                                         </div>
            //                                     </div>
            //                                 </div>

            //                             </div>
            //                         </React.Fragment>

            //                     )
            //                 }}
            //             </ProductConsumer></React.Fragment>