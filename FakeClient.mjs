import fetch from "node-fetch";
//We will use this NPM package to simulate a real life fetch here, becuase we can't use fetch in node normally.
//Do not worry the syntax is the same as in a real project.

//open a new terminal and type: "node .\FakeClient.mjs" to run the code here, feel free to comment out the code you already tested.

//Here you can find a fetch for all the endpoints in the index.js in the same order

async function firstGet() {
    const response = await fetch("http://127.0.0.1:3000/getSomeData")
    const data = await response.json()
    return data
}

//console.log(await firstGet());


//In the previous fetch we didn't do error handeling but from now on we will do it.
//Please try to modify the fetch and experient a bit. (replace the number at the end of the URL, and check what happens)
async function secondGet() {
  try{
    const response = await fetch("http://127.0.0.1:3000/getSpecificEmployee/1");
    const data = await response.json();
    return data;
  }
  catch(error){
    const errorMessage = await error.json()
    return errorMessage
  }
}

//console.log(await secondGet());

//When we are using fetch send any request other than GET, than we will have to give a bit more detailed header to specify what kind of data do we want to send.
//But first noticed that after the URL we needed to set the method? By default it's get, but now since we want to send a POST request we are required to change the method to POST.
//Second we are requried to specify what kind of content we want to send, this is important because many backend servers specify what kind of data they are accepting.
//Our backend is the same, check the 6.th line in the index.js.
//We wrote there the following: app.use(express.json());
//Please hover above that line and check the description of the middleware.
//Ok let's move on see what happens next? We set the content of the request body...Yes, this is the same body where we get the data out in the backend.
//Also you can see that the format of the body must metch the content type, meaning we need to stringify our data here to JSON format.

//--------------------------------------------------PLEASE READ THIS CAREFULLY:-----------------------------------------------------------
//This can be hard to take in, please stay here a while and meditate what is happening here, you can even ask a mentor for help, in fact you are encouraged to ask for a better 
//explenation if you require it, take your time and please only move forward if this makes sense to you :)
//----------------------------------------------------------------------------------------------------------------------------------------

let theDataIWantToSend = {
  name: "Mate Reiner",
  age: 25,
  email: "Mate.Reiner25@company.com",
  profession: "Driver"
}

async function addNewEmployee(passedData) {
  try{

    const response = await fetch('http://127.0.0.1:3000/postAddNewEmpolyee', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(passedData)
    })

    const data = await response.json();
    return data;
  }
  catch(error){
    const errorMessage = await error.json()
    return errorMessage
  }
}

//console.log(await addNewEmployee(theDataIWantToSend));
//IMPORTANT: Careful with nodemon here, make sure to uncomment the part of the code where you list out the employees :)


