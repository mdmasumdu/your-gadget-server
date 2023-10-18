const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port =process.env.PORT|| 5000;


//Middle ware
app.use(cors())
app.use(express.json())

// your-gadget
// xSApPsgOhfFP1ZrZ


const uri = `mongodb+srv://your-gadget:xSApPsgOhfFP1ZrZ@cluster0.1hhdzxu.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);








app.get("/",(req,res)=>{
    res.send("Your Gadget Server is runnnig")
})

app.listen(port,()=>{
    console.log(`Your Gadget server is runnig on port:${port}`)
})
