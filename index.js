const express = require('express')
const app = express();
const port = 8520;
const mongoose = require('mongoose');


const userRouter = require('./controllers/userController');
const adminRouter = require('./controllers/adminController');
const careersRouter = require('./controllers/careersController');



mongoose.connect('mongodb+srv://shivhares2002:mww8frbY4dnHF92a@cluster0.gq0hu.mongodb.net/basicBackend');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("hey")
})

//routers
app.use('/user',userRouter);
app.use('/admin',adminRouter);
app.use('/careers',careersRouter);





app.listen(port, () => {
    console.log(`localhost at ${port}`);
})