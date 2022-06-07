import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb+srv://vikas:<password>@cluster0.1d3d7zi.mongodb.net/appoint?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log(" connected to dataBase")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    date: String
})
const User = new mongoose.model("User", userSchema)

app.get('/', (req, res) => {
    res.send("GET Request Called")
  })

  app.post("/book", (req, res)=> {

    const { name, email, phone , date} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                phone , 
                date
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered" })
                }
            })
        }
    })
    
}) 

app.listen(8080,() => {
    console.log("Running at port 8080")
})


