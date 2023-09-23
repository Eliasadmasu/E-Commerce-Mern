import ProductModel from "../models/ProductModel.js";

//?@ POST /product/create
//?@ desc This will make the admin able to create product
//?@ private
const CreateProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    //image
    const imageUrl = req.file ? req.file.filename : "";
    const { user } = req;

    console.log({ userProduct: user });

    const product = new ProductModel({
      name,
      description,
      price,
      category,
      imageUrl,
    });

    await product.save();

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { CreateProduct };
