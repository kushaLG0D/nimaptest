const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");
const { type } = require("@testing-library/user-event/dist/type");

router.get("/product", async (req, res) => {
  try {
    const limit = req.query.limit;
    const page = req.query.page;
    const product = await Product.find();
    let startIndex=(page-1) * limit;
    let endIndex=(page) * limit;
    res.json(product.slice(startIndex, endIndex));
  } catch (err) {
    res.status("500").json({ message: err.message || "Internal Error" });
  }
});

router.get("/allproduct", async (req, res)=>{
  try{
    const product = await Product.find().countDocuments();
    
    res.json(product);
  }
  catch (err) {
    res.status("500").json({ message: err.message || "Internal Error" });
  }
})

router.post("/product", async (req, res) => {
  try {
    const categoryid = await Category.findOne({
      categoryname: req.body.category,
    });

    const product = new Product({
      productname: req.body.productname,
      category: req.body.category,
      categoryid: categoryid._id.toString(),
      price: req.body.price,
    });
    const save = await product.save();
    res.json(product);
  } catch (err) {
    res.status("500").json({ message: err.message || "Internal Error" });
  }
});

router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteProduct = await Product.deleteOne({ _id });
    res.json(deleteProduct);
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal Error" });
  }
});

router.put("/editproduct/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    let editproduct;
    const categoryid = await Category.findOne({ categoryname: req.body.category});

    // console.log(categoryid._id);
    
     editproduct = await Product.updateOne(
      {_id} ,
      {
        $set: {
         productname: req.body.productname,
         category: req.body.category,
          categoryid:categoryid._id,
         price: req.body.price,
        },
      },
      { new: true }
    );

    res.json(editproduct);
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal Error" });
  }
});

module.exports = router;
