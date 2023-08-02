const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors") ;
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const path = require("path");
const errorHandler = require("./middlewares/errorMiddleware")
const cookieParser = require("cookie-parser")

const app = express()

const PORT = process.env.PORT || 5000

//MIddlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:3000" ,"https://pinvent-app.vercel.app" ],
    credentials: true
}));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routes Middlewares
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

//Routes
app.get("/", (req,res) => {
    res.send("Home Page");
});

//Error Middlewares
app.use(errorHandler);

//connect to DB
mongoose
       .connect(process.env.MONGO_URI)
       .then(() => {
        app.listen(PORT, () => {
            console.log('Server Running on port');
            console.log("${PORT}");
        })
       })
       .catch((err) => console.log())