import { text } from "express";
import ProductModel from "../models/ProductModel.js";
import UserModel from "../models/UserModel.js";

//?@ POST /product/create
//?@ desc This will make the admin able to create product
//?@ private to the admin
const CreateProduct = async (req, res) => {
  try {
    const { name, description, price, category, aboutitem, productinfo } =
      req.body;
    //image
    const imageUrls = req.files.map((file) => file.filename);

    const product = new ProductModel({
      name,
      description,
      price,
      category,
      imageUrl: imageUrls,
      aboutitem,
      productinfo,
    });

    await product.save();

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//?@ Get /product/Get
//?@ desc This will Fetch all the product
//?@ public
const GetAllProduct = async (req, res) => {
  try {
    const products = await ProductModel.find();

    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(401).json({ "Fetching all product ersror": error });
  }
};

//?@ Get /product/search
//?@ desc This will search for product
//?@ public
const SearchProduct = async (req, res) => {
  const { query } = req.query;

  let searchResult;
  try {
    if (query) {
      searchResult = await ProductModel.find({
        name: { $regex: query, $options: "i" },
      });
    } else {
      searchResult = await ProductModel.find({
        name: { $regex: "" },
      });
    }

    res.status(200).json({ products: searchResult });
  } catch (error) {
    console.log(error);
    res.status(401).json({ "Fetching all product ersror": error });
  }
};

//?@ Get /product/update
//?@ desc This will  Filter the product
//?@ private to the admin
const UpdateProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const { name, description, price, category, aboutitem, productinfo } =
      req.body;

    const product = await ProductModel.findById(productId);

    // Check if the product exists
    if (!product) {
      res.status(400).json({ message: "item not found" });
    }
    product.name = name;
    product.description = description;
    product.aboutitem = aboutitem;
    product.productinfo = productinfo;
    product.price = price;
    product.category = category;

    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map((file) => file.filename);

      product.imageUrl = imageUrls;
    }

    await product.save();

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//!@ Get /product/delete/:productId
//!@ desc This will  Delete the product
//!@ private to the admin
const DeleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = ProductModel.findById(productId);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    await ProductModel.findByIdAndDelete(productId);

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//?@ Get /product/Get
//?@ desc This will  Filter the product
//?@ public
const filterdList = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    console.log("🚀 ~ file:", category, minPrice, maxPrice);

    const filter = {};

    if (category) {
      filter.category = category;
    }
    if (minPrice && maxPrice) {
      filter.price = {
        $gte: parseInt(minPrice),
        $lte: parseInt(maxPrice),
      };
    } else if (minPrice) {
      filter.price = {
        $gte: parseInt(minPrice),
      };
    } else if (maxPrice) {
      filter.price = {
        $lte: parseInt(maxPrice),
      };
    }

    const filteredProducts = await ProductModel.find(filter);

    res.status(200).json({ filteredProducts });
  } catch (error) {
    console.error("Error filtering products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//?@ Get /product/detail
//?@ desc This will  show detail for the product
//?@ public

const productDetail = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const AddComment = async (req, res) => {
  const { productId } = req.params;
  const { decodedRtId } = req.user;
  const { text } = req.body;

  try {
    const product = await ProductModel.findById(productId);
    const user = await UserModel.findById(decodedRtId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const comment = {
      user: decodedRtId,
      username: user.username,
      text: text,
    };
    product.comments.push(comment);

    await product.save();

    res.status(201).json({ message: "Comment created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const CurrentUserId = async (req, res) => {
  const CurrentUserId = req.user.decodedRtId;

  try {
    res.status(200).json({ CurrentUserId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const UpdateComment = async (req, res) => {
  const { productId, commentID } = req.params;
  const { decodedRtId } = req.user;
  const { text } = req.body;

  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const comment = product.comments.id(commentID);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== decodedRtId) {
      return res.status(403).json({ message: "Permission denied" });
    }

    comment.text = text;

    await product.save();

    res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const DeleteComment = async (req, res) => {
  const { productId, commentID } = req.params;
  const { decodedRtId } = req.user;

  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const commentIndex = product.comments.findIndex(
      (comment) => comment._id.toString() === commentID
    );

    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const comment = product.comments[commentIndex];

    // Check if the user deleting the comment is the owner of the comment
    if (comment.user.toString() !== decodedRtId) {
      return res.status(403).json({ message: "Permission denied" });
    }

    product.comments.splice(commentIndex, 1);

    await product.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//?@ Get /product/reply
//?@ desc This will  fetch reply
//?@ private
const FetchReplyMessage = async (req, res) => {
  const { productId, commentID } = req.params;

  try {
    // Find the product by productId
    const product = await ProductModel.findById(productId);

    // Find the comment by commentId inside the product's comments array
    const comment = product.comments.find(
      (c) => c._id.toString() === commentID
    );
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const replies = comment.replies;

    res.status(200).json({ replies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//?@ Get /product/reply
//?@ desc This will  fetch reply
//?@ private
const CreateReplyComment = async (req, res) => {
  const { productId, commentID } = req.params;
  const { decodedRtId } = req.user;
  const { text } = req.body;

  try {
    // Find the product by productId
    const product = await ProductModel.findById(productId);
    const user = await UserModel.findById(decodedRtId);

    // Find the comment by commentId inside the product's comments array
    const comment = product.comments.find(
      (c) => c._id.toString() === commentID
    );
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Create a new reply using the replySchema
    const newReply = {
      user: decodedRtId,
      username: user.username,
      text: text,
    };

    // Add the new reply to the comment's replies array
    comment.replies.push(newReply);

    // Save the updated product with the new reply
    await product.save();

    res
      .status(201)
      .json({ message: "Reply created successfully", reply: newReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeleteReply = async (req, res) => {
  const { productId, commentID, replyId } = req.params;

  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const comment = product.comments.find(
      (c) => c._id.toString() === commentID
    );

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const replyIndex = comment.replies.findIndex(
      (reply) => reply._id.toString() === replyId
    );
    if (replyIndex === -1) {
      return res.status(404).json({ error: "Reply not found" });
    }

    comment.replies.splice(replyIndex, 1);

    await product.save();

    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const CreateRating = async (req, res) => {
  const { productId } = req.params;
  const { decodedRtId } = req.user;

  const { value } = req.body;

  try {
    const product = await ProductModel.findById(productId);
    const user = await UserModel.findById(decodedRtId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const newRating = {
      user: decodedRtId,
      username: user.username,
      value,
      createdAt: new Date(),
    };

    console.log({ productId, decodedRtId, value, newRating });

    product.ratings.push(newRating);

    await product.save();

    res.status(201).json({ message: "Rating added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  CreateProduct,
  GetAllProduct,
  filterdList,
  productDetail,
  UpdateProduct,
  DeleteProduct,
  SearchProduct,
  AddComment,
  UpdateComment,
  CurrentUserId,
  DeleteComment,
  CreateReplyComment,
  FetchReplyMessage,
  DeleteReply,
  CreateRating,
};
