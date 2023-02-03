const express = require("express");
const app = express();


//This is an inportant middleware which will make our application to only accept JSON in the request body, and will automatically parse the data as well
app.use(express.json());

//Let's have some data we can work with, in this case our data will be an array of employees, with some of their personal data.
//The goal of our express backend application here is to handle the data stored in this array.
let employees = [
    {id:1, name:"Adam England", age:32, email:"Adam.England32@company.com", profession:"Bodyguard"},
    {id:2, name:"Kate Taylor", age:45, email:"Kate.Taylor45@company.com", profession:"Secretary"},
    {id:3, name:"Erwyn Jager", age:28, email:"Erwyn.Jager28@company.com", profession:"Civil Engineer"},
    {id:4, name:"Abigel Taylor", age:20, email:"Abigel.Toylor20@company.com", profession:"Junior HR manager"}
]

//Hi, here we will practice the creation of endpoints in Express.js and we will also check how they work.
//In the past you might have already used third party API, in that case you could fetch data from that API.
//Right now, what we are about do is, we will want to create a REST API of our own with Express.js.
//As you can see I already imported express in the index.js file and by executing the "npm start" command you can already start your server.
//If we want to create an API of our own, we will have to define so called endpoints that can be triggered by other users.
//By triggered I mean that users can send a GET request or a POST request etc...
//We will need to define the endpoints first, an endpoint will take two parameters, 1:a Path, 2: a function
//Let's take a closer look, shall we :)

//This is an example endpoint, noticed how I defined what kind of endpoint do I want ot make?
//"app.get" as you can see you can define the kind of endpoint you want to make right at the start of creating one.
//In this case this is going to be a GET endpoint with the Path: "/getSomeData"
//We will check how is it possible to get data through this endpoint, but for now let's see what else is there shal we? :)
//The third and final part of an endpoint is a function, in most cases we will use an anonym function here which will have two arguments
//req will be the variable we can use the get the data that we receive from the request itself (sent by the user)
//res, we can use it to send back  a response to the user, here we can send back data and/or a message
//When someone triggers this endpoint this function will be executed.
//Now let's check how a get request looks like. 
//(NOTE: GET requests don't have a "body", meaning that during a GET request the user who triggered this endpoint won't be able to send data in the request body)
app.get("/getSomeData", (req,res) => {
    res.status(200).json(employees);
})
//Let's see what we did here, when this endpoint get's triggered we will send back a JSON object which contains the data, and also we send back a status code of 200
//At this point I would like you to please stop for a moment and open the info.txt file and read the extra explanation about status codes and about express responds.


//Nice let's check another endpoint but this time we will are curious about a specific employee.
//Here we will try to get some data from the URL, this time we will want to get the "id" of the employee of which's data we will want to send back.
//In this case what ends up happening is that by using the ":" before the "id" in the URL we are telling the backend that at this endpoint's URL what ever is at the place of the "id",
//we can get it from the URL by the name of id. Please check the code and see how we will do it.
app.get("/getSpecificEmployee/:id", (req,res) => {
    const requestedId = req.params.id
    let requestedEmployee = employees.find(oneEmployee => oneEmployee.id == requestedId)

    if (requestedEmployee != undefined) {
        res.status(200).json(requestedEmployee)
    }
    else
    {
        res.status(404).json({"message":"Employee not found!"})
    }
})
//From the request object (we call it "req" here) we can get out the id from the params
//And now we will send back the employee with the requested id
//We used the find() javascript method which will return the right object or will return "undefined" with this we can easily send a response in both cases.
//Please feel free to check the next fakeFetch in the FakeClient.mjs and check how we would be able to trigger this endpoint from the frontend.


app.listen(3000)
console.log("App running at port:3000");