const express=require('express');
const router=express.Router();
const Category = require("../models/Category.js");
const Product = require("../models/Product.js");



router.get('/category',async(req,res)=>{
    try{
        const category =await Category.find();
        // console.log(category);
        res.json(category);
        
    }
    catch(err)
    {
        res.status(500).json({message: err.message || "Internal Error"});
    }
})

router.post('/category',async(req,res)=>{
    try{
        console.log(req.body.categoryname);
        const newCategory=new Category({
            categoryname: req.body.categoryname
        })
        const save=await newCategory.save();
        res.json(newCategory);

    }
    catch(err){
        res.status(500).json({message: err.message || "Internal Error"});
    }
})



router.delete('/deletecategory/:id', async(req, res)=>{
    try{
        const _id = req.params.id;
        
        console.log(_id);
        const deleteCategory=await Category.deleteOne({_id});
        const deleteProduct=await Product.deleteMany({categoryid:_id});
        res.json(deleteProduct);

    }
    catch(err){
        res.status(500).json({message: err.message || "Internal Error"});
        }
})

router.put('/editcategory/:id',async (req,res)=>{
    try{
        const _id = req.params.id;
        const categoryname = req.body.categoryname;
        console.log(categoryname);

        const editcategory=await Category.updateOne({_id:_id},{$set:{categoryname:categoryname}},{new:true});

        console.log(editcategory);
        const editProduct=await Product.updateMany({categoryid:_id},{$set:{category:req.body.categoryname}},{new:true});
        console.log(editProduct);

        res.json(editProduct);
    }
    catch(err) {
        res.status(500).json({message: err.message || "Internal Error"});
    }
})

module.exports = router