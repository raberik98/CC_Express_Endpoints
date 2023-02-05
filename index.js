const express = require("express");
const app = express();


//This is an inportant middleware which will make our application to only accept JSON in the request body, and will automatically parse the data as well
app.use(express.json());

//Let's have some data we can work with, in this case our data will be an array of employees, with some of their personal data.
//The goal of our express backend application here is to handle the data stored in this array.
let employees = [
    {id:1, name:"Adam England", age:32, email:"Adam.England32@company.com", profession:"Bodyguard"},
    {id:2, name:"Kate Taylorr", age:45, email:"Kate.Taylor45@company.com", profession:"Secretary"},
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


//So far, all we did is requestion data but now, with this endpoint we are expecting to receive data from the user, let's see and example to this.
//Noticed that the type of this endpoint is POST, meaning that now we can have a body in our request object. 
//In this example we will expect that the data we will receive, contains all the data we need to be able to register a new employee.
//We can access the body like this: req.body, here the body is also an object and it can contain many things, let's take a look.
app.post("/postAddNewEmpolyee",(req,res) => {
    const body = req.body
    //TASK FOR YOU: Log the content of the body to the console and inspect what it contains when you are running the fake fetch from the FakeClient.mjs

    try {
        let newEmployee = {}
        newEmployee.id = employees.length+1
        newEmployee.name = body.name
        newEmployee.age = body.age
        newEmployee.email = body.email
        newEmployee.profession = body.profession

        employees.push(newEmployee)
        res.status(201).json({"message":"New employee has been registered!"})
    } catch (error) {
        console.log(error);
        res.status(406).json({"message":"Invalid data has been provided!"})
    }
})
//Please feel free to check the next fakeFetch in the FakeClient.mjs and check where exactly this body comes from.


//Now we want to edit an already existing employee, check out this: we will combine two things that we have learned ok?
//We will get data from the params and also from the body.
//We will get the id of the employee we want to edit from the params and we will get the new data from the body.
//But one more thing before we start, when do we use PUT? Usually when we are trying to edit/update/extend already existing data in our database. (in our case it's just an array of data)
app.put("/putEditEmployee/:id",(req,res) => {
    let body = req.body

    try {
        employees.forEach(oneEmployee => {
            if (oneEmployee.id == req.params.id) {

                oneEmployee.name = body.name
                oneEmployee.age = body.age
                oneEmployee.email = body.email
                oneEmployee.profession = body.profession

            }
        });
        res.status(201).json({"message":"Edit was successful!"})
    } catch (error) {
        console.log(error);
        res.status(406).json({"message":"Edit was unsuccessful!"})
    }
})
//As you can see, I keep putting my main code inside of a tryCatch, and the reason for it is, that it's a good practice and a standard requirement to be able to handle potential errors
//in the function of your endpoint.
//Please feel free to check the next fakeFetch in the FakeClient.mjs and check how this endpoint could be triggered from the frontend.


//Now this leaves us to one more functionality, we learned how we can get data, how we can post data, how we can edit data, now we will check how to delete data.
//To achive this, we will use a DELETE endpoint, let's see an example.
app.delete("/deleteEmployee/:id",(req,res) => {
    try {
        let newEmployeesArray = employees.filter(oneEmployee =>
            oneEmployee.id != req.params.id
        )
        employees = newEmployeesArray
        
        res.status(201).json({"message":`Successfully deleted the employee with id: ${req.params.id}`})
    } catch (error) {
        console.log(error);
        res.status(406).json({"message":"Delete was unsuccessful!"})
    }
})
//As you can see I simply filter the original array and overwrite it after that, now when we are going to use a real database instead of just an array,
//it's going to be slightly more complicated thatn this.
//Please feel free to check the next fakeFetch in the FakeClient.mjs and check how this endpoint could be triggered from the frontend.



//--------------------------------------------------PLEASE READ THIS CAREFULLY:-----------------------------------------------------------

//Now you might have noticed that, the difference between POST, PUT, and DELETE are minimal. 
//(in this example in the FakeClient.js the DELETE fetch didn't have a body, 
//it wasn't because it can't have it, but this time it was enough for me to pass the id in the params, but if you want to send data to the backend then the syntax is the same as it was in the PUT and POST)
//Except for the GET every request type had a body where we could send data, and the syntax apart from the request type (for example: app.delete or app.put or app.post) was the same.
//We took the data from the request objects body and used it in our logic. So the question you might have is, is there a real difference between POST, PUT and DELETE?
//No there isn't technically you can use only GET and POST and cover all of the functionalites you want to have easily.
//The reason why it is better to use PUT and DELETE as well is because your code will be easier to read this way, and you can use the same URL string like this multiple times.
//Confused? It's ok, let me explain.
//When you are writing a GET endpoint you can use a URL only once, I give you an example:

//app.get("/employees", (req,res) => {LOGIC HERE})
//app.get("/employees", (req,res) => {LOGIC HERE})
//THIS WON'T WORK, because you have two GET endpoints with the same URL string. Let's have another example:

//app.post("/employees", (req,res) => {LOGIC HERE})
//app.post("/employees", (req,res) => {LOGIC HERE})
//THIS WON'T WORK, for the same reason as well. But ...

//app.get("/employees", (req,res) => {LOGIC HERE})
//app.post("/employees", (req,res) => {LOGIC HERE})
//app.put("/employees", (req,res) => {LOGIC HERE})
//app.delete("/employees", (req,res) => {LOGIC HERE})
//THIS WILL WORK, because even though the URL string is the same, the type is different. I hope it makes at least a bit more sense now :)

//One final thing I want to ask you, please go through this example project as many times as you need and if you have any questions, seriously ANY questions, 
//contact a mentor and ask them to help you fully understand this. Knowing this is mandatory for you to be able to progress on, and we are more than happy to assist you.

//----------------------------------------------------------------------------------------------------------------------------------------

app.listen(3000)
console.log("App running at port:3000");