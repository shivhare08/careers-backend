const express = require('express')
const app = express();
const port = 8520;
const mongoose = require('mongoose');
const cors = require('cors')
const cloudinary = require('cloudinary');
const expressFileUpload = require('express-fileupload');


app.use(cors());

const userRouter = require('./controllers/userController');
const adminRouter = require('./controllers/adminController');
const careersRouter = require('./controllers/careersController');
const contactRouter = require('./controllers/contactController');



//mongoose.connect('mongodb+srv://shivhares2002:mww8frbY4dnHF92a@cluster0.gq0hu.mongodb.net/basicBackend');
//export const live_url = "mongodb+srv://shivhares2002:FIZDM8qUwguT9Zhh@courseera-app.d8d6i.mongodb.net/?retryWrites=true&w=majority&appName=courseera-app"
// function connectdb(){
//     mongoose.connect('mongodb+srv://shivhares2002:vA5koFSpNO1GstMb@cluster0.idnifnn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
//     )
// }

// connectdb();

mongoose.connect('mongodb+srv://shivhares2002:J1uoYmwpmQrirlkg@careerapp.6dkf0hq.mongodb.net/?retryWrites=true&w=majority&appName=careerApp')

app.use(express.urlencoded({extended:false}));
app.use(expressFileUpload({
    useTempFiles:true
}))

app.use(express.json());

app.get('/', (req, res) => {
    res.send("hey")
})

//routers
app.use('/user',userRouter);
app.use('/admin',adminRouter);
app.use('/careers',careersRouter);
app.use('/contact',contactRouter)





app.listen(port, () => {
    console.log(`localhost at ${port}`);
})