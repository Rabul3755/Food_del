import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [cartItems, setCartItems] = useState({});
  const currency ='₹'
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);

  const addToCart =async (itemId) => {
 
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
     console.log(itemId)
    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          {itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error('Error adding to cart:', error.response ? error.response.data : error.message);
      }
    }
    
  };

  const removeFormCart =async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove", {itemId},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }
  };

  const getCartTotal = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
  
      if (cartItems[item] > 0) {
        
        // let itemInfo = food_list.find((product) => product._id === item);
     
        // totalAmount += itemInfo.price * cartItems[item];
         totalAmount += 5 * cartItems[item];
      }
    }
    return totalAmount;
    
  };

  const fetchFoodlist = async () => {
    const reponse = await axios.get(url + "/api/food/list");
   
    setFood_list(reponse.data.data);
  };
const loadCardtData = async (token)=>{
 
  
  const response = await axios.get(url+"/api/cart/get",{headers:{token}},{})

  setCartItems(response.data.cartData)
}

  useEffect(() => {
    async function loadData() {
      await fetchFoodlist();
     
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCardtData(localStorage.getItem("token"))
      }
    }
    loadData();
  }, []);

  const ContextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFormCart,
    setCartItems,
    getCartTotal,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
