import Cart from "../models/Cart.js";

/* GET CART */

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({
      userId,
    }).populate("items.menuItemId");

    if (!cart) {
      return res.json({
        items: [],
      });
    }

    res.json(cart);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/* ADD TO CART */

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const { menuItemId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.menuItemId.toString() === menuItemId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        menuItemId,
        quantity,
      });
    }

    await cart.save();

    const updatedCart = await Cart.findOne({
      userId,
    }).populate("items.menuItemId");

    res.json(updatedCart);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/* UPDATE CART */

export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const { menuItemId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find((i) => i.menuItemId.toString() === menuItemId);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    item.quantity = quantity;

    await cart.save();

    const updatedCart = await Cart.findOne({
      userId,
    }).populate("items.menuItemId");

    res.json(updatedCart);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/* REMOVE ITEM */

export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;

    const { menuItemId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.menuItemId.toString() !== menuItemId,
    );

    await cart.save();

    const updatedCart = await Cart.findOne({
      userId,
    }).populate("items.menuItemId");

    res.json(updatedCart);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/* CLEAR CART */

export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({
        success: true,
      });
    }

    cart.items = [];

    await cart.save();

    res.json({
      success: true,

      message: "Cart cleared",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
};
