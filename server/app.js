const express = require('express');
const cors = require('cors');
// require('dotenv').config()
const app = express()
const userRouter = require("./router/user_router")
const productsRouter = require("./router/products_router")
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

app.use(cors());
app.use(express.json()); //post put
app.use('/users/', userRouter);
app.use('/products/', productsRouter);
app.use(function(req, res){
    res.status(404).send("<h1>Error page /n 404</h1>")
})

app.listen(PORT, HOST, ()=> {
    console.log(`Server listens on http://${HOST}:${PORT}`,
    )
})