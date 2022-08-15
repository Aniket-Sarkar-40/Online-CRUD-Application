require("dotenv").config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const client = require("./models/registers");
require("./db/conn");
const nodemailer = require('nodemailer');


const app = express();
const port = process.env.PORT || 8000;
const static_path = path.join(__dirname, `../public`);
const view_path = path.join(__dirname, `../templates/views`);
const partial_path = path.join(__dirname, `../templates/partials`);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", view_path);
hbs.registerPartials(partial_path)

// console.log(process.env.SECRET_KEY);

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/about",(req,res)=>{
    res.render("about");
})

app.get("/:id/update", async(req,res)=>{
    try {
        const _id = req.params.id;
        const Data = await client.find({_id});
        
        res.render("update",{Data:Data[0]});
    } catch (error) {
        console.log(error.message);
    }
})

app.get("/:id/mail", async(req,res)=>{
    try {
        const _id = req.params.id;
        const Data = await client.find({_id});
        
        let emailText = `Name - ${Data[0].name},
        Phone Number - ${Data[0].phoneNumber},
        Email - ${Data[0].Email},
        Hobbies - ${Data[0].Hobbies}`;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'aniket15970@gmail.com',
              pass: `${process.env.AUTH_PASS}`
            }
        });
        var mailOptions = {
            from: 'aniket15970@gmail.com',
            to: 'info@redpositive.in',
            subject: 'Email from node js',
            text: emailText
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
        res.redirect('../');
    } catch (error) {
        console.log(error.message);
    }
})

app.get("/api", async(req, res) => {
    try {
        const Data = await client.find();
        res.send(Data);
        
    } catch (error) {
        res.send(error)   
    }
});

app.post("/", async (req, res) => {
    try {

        const newClient = new client({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            Email: req.body.Email,
            Hobbies : req.body.Hobbies
        });

        const registerData = await newClient.save();
        res.status(201).render("index");

    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
})

app.post("/:id/update", async (req,res)=>{
    try {
        const _id = req.params.id;
        const updateData = await client.findByIdAndUpdate(_id,req.body,{
            new : true,
            useFindAndModify : false
        });
        if (!updateData) {
            res.status(404).send();
        }
        else{
            res.redirect('../');
        }
    } catch (error) {
        res.send(error.message);
    }
})

// delete by id
app.get("/:id/delete", async (req,res)=>{
    try {
        const _id = req.params.id;
        const data = await client.findByIdAndDelete({_id});
        res.redirect('../');
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})


app.listen(port, () => {
    console.log(`Linstening on the port ${port}`);
})