import React from 'react';
import { useContext } from 'react';
import { ProductContext } from '../ProductContext';
import PropTypes from 'prop-types';
import ButtonStyled2 from '../components/layouts/ButtonStyled2';

export const Filter = () => {
    const productContext = useContext(ProductContext);
    const { products, handleChange, category, minPrice, maxPrice, price, onSale, search } = productContext;
    // console.log(ProductContext);
    let tempCategory = products.map(product => {
        if (product.category.includes('|')) {
            return product.category.split('|');
        } else {
            return product.category;
        }
    }
    );

    tempCategory = ['All', ...tempCategory];
    // console.log(tempCategory.flat());
    const categories = [...new Set(tempCategory.flat())];
    // console.log(category);

    return (
        <div className="filters  border border-info m-5 m-sm-3 p-4">
            <h4>Filter:</h4>
            <div className="form-group">
                <label htmlFor="search">Find a product:</label>
                <input type="text" name="search" placeholder="Search..." value={search} className="form-control" onChange={handleChange} />
            </div>

            {/* Filtering Category */}
            <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select name="category" id="category" value={category} className="form-control" onChange={handleChange} >
                    {
                        categories.map((item, index) => {
                            return (<option key={index} value={item}>{item}</option>)
                        })
                    }
                </select>
            </div>
            {/*End of Filtering Category */}


            {/* Filteriing Price */}
            <div className="form-group">
                <div className="form-inline">
                    <label htmlFor="priceRange">Price From&nbsp;</label>
                    <input className="form-control col-3 mx-1" name="minPrice" id="priceRange" type="number" value={minPrice} placeholder="" onChange={handleChange} onFocus={(e) => e.target.value = ""} />
                    <label htmlFor="priceRange"> To &nbsp;</label>
                    <input className="form-control col-3 mx-1" name="maxPrice" id="priceRange" type="number" onFocus={(e) => e.target.value = ""} placeholder="" value={maxPrice} onChange={handleChange} />
                </div>
            </div>
            {/*End of Filtering Price */}



            {/*Filtering On Sale */}
            <div className="form-group">
                <div>
                    <label htmlFor="onSale">On Sale&nbsp;</label>
                    <input type="checkbox" className='checkbox-wrapper' id="onSale" checked={onSale} onChange={handleChange} name="onSale" />
                </div>
            </div>
            {/*End of Filtering On Sale */}
        </div >
    )
};

Filter.propTypes = {
    products: PropTypes.array,
    handleChange: PropTypes.func,
    category: PropTypes.string,
    minPrice: PropTypes.string,
    maxPrice: PropTypes.string,
    price: PropTypes.string,
    onSale: PropTypes.bool,
    search: PropTypes.string
}

export default Filter;