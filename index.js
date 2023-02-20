const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/User.route")
const { noteRouter } = require("./routes/Note.route")
const { authenticate } = require("./middlewares/authenticate.middleware")
const cors=require("cors")
require("dotenv").config()  
const app = express()

app.use(express.json())

app.use(cors())

app.get("/", (req, res) => {
    res.send("home page")
})
app.use("/users", userRouter)
app.use(authenticate)
app.use("/posts", noteRouter)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected to db")
    } catch (err) {
        console.log(err.message)
    }
    console.log(`server is running at port ${process.env.port}`)
})