const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/order");

// app
const app = express();

// db
const uri = "mongodb+srv://supriyo:sdas1997@cluster0.6pfdw.mongodb.net/ecommerce?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose
    .connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB Connected"));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);

const port = process.env.PORT || 8000;

if(process.env.NODE_ENV=="production"){
    app.use(express.static("react-frontend/build"));
    const path =require("path");
    app.get("/api",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(port, () => {
    console.log(`Server is running on port`);
});
