const express = require("express");
const app = express();
const port = process.env.PORT || 3000
const products = require("./router/product")

const {connectDb} = require("./db")

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use("/", products)

const start = async () => {
    try {
        await connectDb()
        app.listen(port, console.log("Server is listening"))
    } catch (error) {
        console.log(error)
    }
}

start()

