import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import Product from './Product'
import { getProducts } from '../api/products';

function Products() {

    const [products, setProduct] = useState([]);
    
    //get product list here 
    const getProductList = async () => {
        const response = await getProducts();
        if (response?.data?.products.length) {
            setProduct(response?.data?.products)
        }
    }


    useEffect(() => {
        if (!products.length) {
            getProductList()
        }
    }, []);


    return (
        <div className='main-container'>
            <div className='main-header' >
                <Link to="/" style={{ textDecoration: "none" }}> <h4>Batteries</h4></Link>
                <p>View all batteries</p>
            </div>
            <div className='product-container'>
                {products?.length && products.slice(0, 6)?.map((product) => {

                    return (
                        <Product product={product} />
                    )
                })
                }
            </div>
        </div>
    )
}

export default Products