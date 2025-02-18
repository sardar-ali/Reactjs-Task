import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../api/products'

function ProductDetails() {
    const [product, setProduct] = useState({});
    const { id } = useParams();


    //get product details of selected product here
    const getProductDetails = async (id) => {
        const response = await getProductDetail(id);
        console.log("response :::", response?.data);
        if (response?.data) {
            setProduct(response?.data)
        }
    }

    useEffect(() => {
        getProductDetails(id)
    }, [id])

    return (
        <div className='main-container'>

            <div className='product-container'>
                <div className='product-card'>
                    <div className='product-item'>
                        <div className='image-container'>
                            <div className='main-image'>
                                <img src={product?.thumbnail} alt='img' />
                            </div>
                            <div className='image-list'>
                                {product?.images?.length && product?.images?.slice(0, 4).map((img, ind, arr) => {

                                    return (
                                        <div className={` box ${arr[0] === img ? "is-selected" : ""} `}>
                                            <img className={`'active-image'}`} src={img} alt='img' />
                                        </div>
                                    )

                                })}
                            </div>
                        </div>
                        <div className='details-container'>
                            <div className='flex space-between'>
                                <div>
                                    <img className="offere" src='/images/offer.png' alt='img' />
                                </div>
                                <div>
                                    <img className="brand" src='/images/brand.png' alt='img'/>
                                </div>
                            </div>
                            <div className='flex space-between'>
                                <h3 className='product-name'>{product?.title}</h3>
                                <p className='flex justify-center align-center heart-icon'>
                                    <img className='icon' src='/images/heart.png' alt='img' />
                                </p>
                            </div>
                            <div className='flex'>
                                <div className='status flex justify-center align-center'>
                                    <p>Selling out fast</p>
                                </div>
                                <div className="country flex justify-center align-center">
                                    <p>Best in UAE</p>
                                </div>
                            </div>
                            <div className="flex space-between">
                                <div className="main">
                                    <p>Capecity </p>
                                    <h3> 36 AH</h3>
                                </div>
                                <div className="main">
                                    <p>Warrenty  </p>
                                    <h3> 3 Years</h3>
                                </div>
                                <div className="main">
                                    <p>Price  </p>
                                    <h3> Wholesale only</h3>
                                </div>

                            </div>

                            <div className="flex space-between">
                                <div className='price'>
                                    <p>Price Inclusive of VAT</p>
                                    <h3>{product?.price} AED</h3>
                                </div>
                                <p className='flex justify-center align-center heart-icon'>
                                    <img className='icon' src='/images/shopping-bag-check.png' />
                                </p>
                            </div>

                            <div>
                                <p className="available">Also available on</p>
                                <div className="icon-container flex space-between">
                                    <div className="icon-box flex justify-center align center">
                                        <img src="/images/Rectangle-1247.png" alt='img' />
                                    </div>
                                    <div className="icon-box flex justify-center align center">
                                        <img src="/images/Rectangle-123.png" alt='img' />
                                    </div>
                                    <div className="icon-box flex justify-center align center">
                                        <img src="/images/Rectangle-1234.png" alt='img' />
                                    </div>
                                    <div className="icon-box flex justify-center align center">
                                        <img src="/images/Frame-358.png" alt='img'/>
                                    </div>
                                </div>
                                <div className="button">
                                    Buy now
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductDetails