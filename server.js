const express = require("express");
const bodyParser = require("body-parser");

const homeRoute = require("./routes/ProjectsRoute");
const mongoose = require("mongoose");

require("dotenv").config();



const projectSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        tech: String,
        image: String,
        video: String,
        timePeriod: Date,
        github: Array
    }
);

const ProjectModel = mongoose.model("Project", projectSchema);

const app = express();

app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Acces-Control-Allow-Headers", "Cach-Control, Content-Location, Date, ETag, Expires, Vary");
    res.setHeader("Acces-Control-Allow-Methods", "GET, POST");
    next();
});

//This doesn't do anything. It is just to wake up the Heroku Server.
app.get("/", (req, res) => {
    console.log("Wake up server");
});

app.get("/projects", (req, res) => {
    ProjectModel.find({},(err, result) => {
        if(!err){
            res.send(result);
        }else{
            console.log(err);
        }
    });
});

app.get("/projects/:projectId", (req, res) => {
    ProjectModel.findOne({_id: req.params.projectId},(err, result) => {
        if(!err){
            res.send(result);
        }else{
            console.log(err);
        }
    });
});



// app.use(bodyParser.json());

// app.use(homeRoute);

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-58ciu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
     { 
         useNewUrlParser: true,
           useUnifiedTopology: true 
        })
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server is running on port 5000");
    });
})
.catch(() => {
    console.log("Sorry, didn't connect");
});


