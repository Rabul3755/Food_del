import React from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { assets } from "../../assets/assets.js";
const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
   
    if (response.data.success) {
      
      setOrders(response.data.data);
     
    } else {
      toast.error("Error");
    }
    
  };
  useEffect(() => {
      fetchAllOrders();
    }, []);

  const statusHandler = async (e, orderId) => {
    const res = await axios.post(url + "/api/order/status", {
      orderId,
      status: e.target.value,
    });
    if (res.data.success) {
      await fetchAllOrders();
    }
  };

  return (
    <div className="order add">
      <h3>Order Page</h3>
  
      <div className="order-list">
        {orders.map((order, index) => (
  <div key={index} className="order-item">
    <img src={assets.parcel_icon} alt="" />
    <div>
      <p className="order-itemfood">
        {order.items.map((item, i) =>
          i === order.items.length - 1
            ? item.name + "x" + item.quantity
            : item.name + "x" + item.quantity + ", "
        )}
      </p>
      <p className="order-item-name">
        {order.address.firstName + " " + order.address.lastName}
      </p>
      <div className="order-item-address">
        <p>{order.address.street + ","}</p>
        <p>
          {order.address.city +
            "," +
            order.address.state +
            "," +
            order.address.country +
            "," +
            order.address.zipcode}
        </p>
      </div>
      <p className="order-phone">{order.address.phone}</p>
    </div>
    <p>Items: {order.items.length} </p>
    <p>${order.amount}</p>
    <select
      onChange={(e) => statusHandler(e, order._id)}
      value={order.status}
    >
      <option value="Food Processing">Food Processing</option>
      <option value="Out for Delivery">Out for Delivery</option>
      <option value="Delivered">Delivered</option>
    </select>
  </div>
))}

      </div>
    </div>
  );
};

export default Order;
