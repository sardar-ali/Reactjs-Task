import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className='flex justify-center align-center flex-column home'>
            <h2>WELCOME TO React PROJECT</h2>
            <Link to="/products">
                <button>Go To Product Screen <img src="/images/arrow.jpg" /></button>
            </Link>
        </div>
    )
}

export default Home