const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
const UserModel = require("./models/User");
app.use(express.json());
app.use(cors({origin: true, credentials: true}));

mongoose.connect(process.env.MANGO)

app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save()
    res.json(user)
})

app.get("/getusers", (req, res) => {
    console.log("inside")
    UserModel.find({}, (err, result) => {
        if (!err) {
            res.json(result)
        } else {
            res.json(err)
        }
    })
})

app.put("/updateUser", (req, res) => {

    const { id, name, age, userName } = req.body
    console.log(req.body)
    try {
        UserModel.findById(id,  (err, user) => {
            console.log(user)
            user.name = name
            user.age = age
            user.userName = userName
            user.save()
            res.send("User has been successfully updated in DB")
        })
    }
    catch (err) {
        res.send("Getting error from server")
    }
})

app.delete("/deleteUser/:id", async (req, res) => {
    const id = req.params.id

    await UserModel.findByIdAndRemove(id).exec()
    res.send("User has been successfully deleted from DB")
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is running perfectly on port ${PORT}`)
})