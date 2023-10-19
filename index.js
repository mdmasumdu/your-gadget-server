const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

   const productCollection = client.db('ProductDB').collection('Products')
   const carts = client.db('ProductDB').collection('cart')


   app.get('/products',async (req,res)=>{
    const cursor = productCollection.find()
    const result = await cursor.toArray()
    res.send(result)
   })


   app.get('/products/:id',async (req,res)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await productCollection.findOne(query)
    res.send(result)
   })


    app.post("/addproduct",async (req,res)=>{

    const newProduct = req.body;
    const result = await productCollection.insertOne(newProduct)
      res.send(result)
      
    })



    app.put('/update/:id',async (req,res)=>{
      const id =req.params.id;
      const product = req.body;
      const filter = { _id:new ObjectId(id) };
      const options = { upsert: true };

      const updateProduct = {
        $set: {
          productname:product.productname,
          brandname:product.brandname,
          price:product.price,
          rating:product.rating,
          shortdescription:product.shortdescription,
          photo:product.photo
        },
      };


      const result = await productCollection.updateOne(filter,updateProduct,options)
      res.send(result)
    })




// cart apis
    app.post("/cart",async (req,res)=>{
      const product =req.body;
      const result = await carts.insertOne(product)
      res.send(result)
      
    })

    app.get('/cart',async (rew,res)=>{
      const cursor = carts.find()
      const result = await cursor.toArray()
      res.send(result)

    })

    app.delete('/cart/:id',async(req,res)=>{
      const id = req.params.id
      console.log(id)
      const query = {_id:id };
      const result = await carts.deleteOne(query);
    res.send(result)
    })


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
