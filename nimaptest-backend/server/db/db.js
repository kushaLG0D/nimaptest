const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nimaptest').then(()=>{
    console.log('Connected to database sucessfully')
}).catch(e=>{
    console.log(`Connection to database failed ${e}`);
});