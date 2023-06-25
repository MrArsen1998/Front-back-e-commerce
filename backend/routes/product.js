const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const router = require("express").Router();

//Create
router.post("/add", verifyTokenAndAdmin, async (req, res)=> {
    const newProduct = new Product(req.body);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
})

//Update
router.put("/update/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
        {
            $set: req.body,
        }, 
        { new: true })
        res.status(200).json(updatedProduct);
    } catch (err) { 
      res.status(500).json(err);
    }
});

//Delete
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted!")
    }catch(err){
        res.status(500).json(err)
    }
})

//Get Product
router.get("/find/:id", async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    }catch(err){
        res.status(500).json(err)
    }
})

//Get All Products
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const qGender = req.query.gender; // New parameter for gender

  try {
    let products;
    const query = {}; // Empty query object to build the filter conditions

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else {
      if (qCategory) {
        query.category = qCategory;
      }
      if (qGender) {
        query.gender = qGender;
      }
      products = await Product.find(query);
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
