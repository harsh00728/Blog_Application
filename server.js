const express= require("express");
const cors= require('cors');
const morgan= require('morgan');
const colors= require('colors');
const dotenv= require('dotenv');
const connectDB = require("./config/db");

// env config
dotenv.config();

//routers import
const userRoutes= require('./routes/userRoutes');
const blogRoutes= require('./routes/blogRoutes');

// mongodb connection 
connectDB();

// rest objects
const app= express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

//port
const PORT= process.env.PORT || 8080 ;
const DEV_MODE= process.env.DEV_MODE;

// listen
app.listen(PORT, ()=>{
    console.log(`server running on ${DEV_MODE} mode port no ${PORT}`.bgCyan.white);
});