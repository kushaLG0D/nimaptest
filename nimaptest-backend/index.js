const express=require('express');
const app = express();
const path = require('path');
const cors=require('cors');

const port=5000;

require('./server/db/db.js');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, './public')));



app.use('/',require('./server/routes/category.js'));
app.use('/',require('./server/routes/product.js'));



app.listen(port,()=>{
    console.log(`i am listening on port:${port}`);
})