import React from "react";
import "./Header.css";
import { assets } from "../../assets/assets";



const Header = () => {
  return (
    <div className="header " >
      <div className="header-content">
        <h2>Order your your favourite food here</h2>
        <p>
          Choose from a diverse menu feacturing a delectable array of dishes
          crafted with the finest ingrendents and culinary expertise. Our
          mission to satisfy your craing and elevate your dining experinces, one
          delicious meal ar a time.{" "}
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
