import ProductModel from "../models/ProductModel.js";
import Cart from "../models/cartSchema.js";
import stripeModule from "stripe";
import "dotenv/config.js";
import UserModel from "../models/UserModel.js";
import nodemailer from "nodemailer";
import Order from "../models/orderModel.js";

const stripe = stripeModule(process.env.STRIPE_KEY_API);

//?@ Post /cart/:/producctId/addtocart
//?@ desc This will  add to cart
//?@ private
const AddToCart = async (req, res) => {
  const { productId } = req.params;
  const { decodedRtId } = req.user;
  const { quantity } = req.body;

  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cartItem = await Cart.findOne({
      user: decodedRtId,
      product: productId,
    });

    if (cartItem) {
      cartItem.quantity += parseInt(quantity);
    } else {
      cartItem = new Cart({
        user: decodedRtId,
        product: productId,
        quantity: parseInt(quantity),
      });
    }
    await cartItem.save();

    res.status(201).json({ message: "Product added to the cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//?@ Get /cart/cartlist
//?@ desc This will  add to cart
//?@ private
const getCartItems = async (req, res) => {
  const { decodedRtId } = req.user;

  try {
    const cartItems = await Cart.find({ user: decodedRtId }).populate(
      "product"
    );
    res.status(200).json({ cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateQuantity = async (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  try {
    const cartItem = await Cart.findById(cartItemId);

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    cartItem.quantity = quantity;

    await cartItem.save();

    res
      .status(200)
      .json({ message: "Quantity updated successfully", cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCartItem = async (req, res) => {
  const { cartItemId } = req.params;

  try {
    const cartItem = await Cart.findByIdAndRemove(cartItemId);

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCartTotal = async (req, res) => {
  const { decodedRtId } = req.user;

  try {
    const cartItems = await Cart.find({ user: decodedRtId }).populate(
      "product"
    );

    const totalValue = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.product.price;
    }, 0);

    res.status(200).json({ totalValue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getCartItemCount = async (req, res) => {
  const { decodedRtId } = req.user;

  try {
    const cartItemCount = await Cart.find({
      user: decodedRtId,
    }).countDocuments();

    res.status(200).json({ cartItemCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const clearCart = async (req, res) => {
  const { decodedRtId } = req.user;

  try {
    // Remove all cart items for the user
    await Cart.deleteMany({ user: decodedRtId });

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Gmail SMTP port (587 for TLS)
  secure: false, // true for 465, false for other ports
  auth: {
    user: "Eliaselaw4@gmail.com", // Your Gmail email address
    pass: "ptwh odvk gcgy ijkv", // Your Gmail email password or App password
  },
});

const sendPaymentSuccessEmail = async (customerEmail) => {
  const emailMessage = `
  Dear Customer,

  Thank you for your purchase! We are pleased to inform you that your payment was successful.


  Your order will be processed shortly, and you will receive a confirmation email once it has been shipped.

  If you have any questions or concerns, please feel free to contact our customer support team.

  Thank you for choosing our services.

  Best Regards,
  Shop Me
`;

  try {
    await transporter.sendMail({
      from: "your_email@gmail.com",
      to: customerEmail,
      subject: "Payment Successful - Order Confirmation",
      text: emailMessage,
    });

    console.log("Payment success email sent!");
  } catch (error) {
    console.error("Error sending payment success email:", error);
  }
};
const CheckoutStripe = async (req, res) => {
  const { items } = req.body;
  const { decodedRtId } = req.user;

  try {
    const line_items = items.map((item) => {
      const unitAmountInCents = Math.round(item.product.price * 100);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.name,
            metadata: {
              id: item._id,
              userId: item.user,
            },
          },
          unit_amount: unitAmountInCents,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      payment_method_types: ["card"],
      metadata: {
        userId: decodedRtId, // Include user identifier in metadata
      },
      success_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/product",
    });

    res.json({ url: session.url, items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment failed" });
  }
};

const createOrder = async (userId, items, totalAmount) => {
  console.log({ userId });
  console.log({ items });
  console.log({ totalAmount });

  const products = items.map((item) => ({
    product: item.product,
    quantity: item.quantity,
  }));

  console.log({ products });
  const order = new Order({
    userId,
    products,
    totalAmount,
  });
  console.log({ order });

  await order.save();
  return order;
};

const StripeWebHook = async (req, res) => {
  let event;

  try {
    event = req.body;
  } catch (error) {
    console.error("Error parsing webhook body:", error);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      // console.log({ session });
      console.log("Payment was successful!");
      const customerEmail = session.customer_details.email;
      const userId = session.metadata.userId;

      await sendPaymentSuccessEmail(customerEmail);

      const cartItems = await Cart.find({ user: userId }).populate("product");

      const totalAmount = cartItems.reduce((total, cartItem) => {
        return total + cartItem.quantity * cartItem.product.price;
      }, 0);

      await createOrder(userId, cartItems, totalAmount);

      await Cart.deleteMany({ user: userId });

      break;
    case "payment_intent.created":
      // Handle payment intent created event
      console.log("Payment intent created!", event);
      // Add your handling logic here
      break;
    case "mandate.updated":
      // Handle mandate updated event
      console.log("Mandate updated!", event);
      // Add your handling logic here
      break;
    case "charge.succeeded":
      // Handle charge succeeded event
      console.log("Charge succeeded!");
      // Add your handling logic here
      break;
    case "checkout.session.expired":
      // Handle charge succeeded event
      console.log("checkout session expired!");
      // Add your handling logic here
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).end();
};

// !Order

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "userId",
        select: "username",
      })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const orderDetail = async (req, res) => {
  const { orderId } = req.params;
  try {
    const orderDetail = await Order.findById(orderId).populate(
      "products.product"
    );
    res.status(200).json(orderDetail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  AddToCart,
  getCartItems,
  updateQuantity,
  deleteCartItem,
  getCartTotal,
  getCartItemCount,
  clearCart,
  CheckoutStripe,
  StripeWebHook,
  getAllOrders,
  orderDetail,
};
