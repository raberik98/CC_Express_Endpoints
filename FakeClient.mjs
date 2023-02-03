import fetch from "node-fetch";
//We will use this NPM package to simulate a real life fetch here, becuase we can't use fetch in node normally.
//Do not worry the syntax is the same as in a real project.

//open a new terminal and type: "node .\FakeClient.mjs" to run the code here, feel free to comment out the code you already tested.

//Here you can find a fetch for all the endpoints in the index.js in the same order
async function asd123() {
    const response = await fetch("http://127.0.0.1:3000/getSomeData")
    const data = await response.json()
    return data
}

console.log(await asd123());