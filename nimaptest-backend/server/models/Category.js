const mongoose=require('mongoose');


const categorySchema = new mongoose.Schema({
    categoryname: {
        type:String,
        required:[true,"Category Name Required"]
    },
    date:{
        type:Date,
        default:Date.now
    }
})


const Category = mongoose.model('Category',categorySchema);

module.exports=Category;