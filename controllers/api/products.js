const Product = require("../../models/product");
const Category = require("../../models/category");

module.exports = {
  index,
  show,
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};

async function getAllProducts(req, res) {
  try {
    const products = await Product.find({})
      .sort("name")
      .populate("category")
      .exec();
    products.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function index(req, res) {
  const products = await Product.find({}).sort("name").populate("category").exec();
  products.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
  res.json(products);
}

async function show(req, res) {
  const product = await Product.findById(req.params.id);
  res.json(product);
}


async function createProduct (req, res) {
  try {
    const { name, description, imgUrl, category, price } = req.body;

    // Find the category ObjectId by name
    const categoryDocument = await Category.findOne({ name: category });

    if (!categoryDocument) {
      return res.status(400).json({ error: "Category not found" });
    }

    const newProduct = new Product({
      name,
      description,
      imgUrl,
      category: categoryDocument._id, 
      price,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};




 async function getProductById (req, res) {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


 async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Product.findByIdAndRemove(productId);

    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
 async function updateProduct (req, res) {
  try {
    const productId = req.params.id;
    const updatedData = req.body; 
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await Product.findByIdAndUpdate(productId, updatedData);
    const updatedProduct = await Product.findById(productId);

    res
      .status(200)
      .json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
