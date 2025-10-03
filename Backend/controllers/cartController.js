import userModel from "../models/userModle.js";

const addToCart = async (req, res) => {
 
  try {
    console.log(req.body)
    let userData = await userModel.findById({ _id: req.body.userId });

    let cartData = userData.cartData;


    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
   await userModel.findByIdAndUpdate( req.body.userId , { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ id: req.body.userId });
    let cartData = userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findOneAndUpdate({ id: req.body.userId }, { cartData });
    res.json({ success: true, message: "Removed form Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


const getCart = async (req, res) => {
 
  try {
  
    let userData = await userModel.findById({ _id: req.body.userId });

    let cartData = userData.cartData || {};
    
    res.json({ success: true, cartData });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};
export { addToCart, removeFromCart, getCart };
