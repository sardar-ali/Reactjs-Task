import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getProducts } from '../api/products';

function Products() {

    const [products, setProduct] = useState([]);
    const navigate = useNavigate();

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

    // Navigate to the product details screen programmatically
    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };


    return (
        <>
            <div className='main-container'>
                <div className='main-header' >
                    <Link to="/" style={{ textDecoration: "none" }}> <h4>Batteries</h4></Link>
                    <p>View all batteries</p>
                </div>
                <div className='product-area'>
                    {products?.length && products?.slice(0, 6)?.map((itm) => {
                        return (
                            <div className='card' key={itm?.id} onClick={() => handleProductClick(itm?.id)}>
                                <div className='img-card'>
                                    <img src={itm?.thumbnail} />
                                </div>
                                <div className='description'>
                                    <p>{itm?.title}</p>
                                    <p>{itm?.price} AED</p>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>

        </>
    )
}

export default Products