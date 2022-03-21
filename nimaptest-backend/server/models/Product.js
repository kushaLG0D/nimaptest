const mongoose=require('mongoose');


const productSchema = new mongoose.Schema({
    productname: {
        type:String,
        required:true
    },
     category:{
        type:String,
        required:[true,"Category Name Required"]
    },
    categoryid:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
   

})


const Product = mongoose.model('Product',productSchema);

module.exports=Product;