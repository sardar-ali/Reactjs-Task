import React from "react";
// import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex justify-center align-center flex-column home">
      <h1>React App - Welcome!</h1>
      <p>Learn Jenkins</p>
      {/* <Link to="/products"> */}
      <button>
        Go To Product Screen <img src="/images/arrow.jpg" alt="img" />
      </button>
      <p>{process.env.REACT_APP_VERSION ?? "1.0.0"} v</p>
      {/* </Link> */}
    </div>
  );
}

export default Home;
