import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config'

const app = express()
const PORT = 5000;

app.use(express.json())
// mongodb start
const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
} 
 await connectToMongoDB()
// mongodb end




app.get('/', (req, res) =>{
     res.send({msg:'server is running...bappi'})
})

app.listen(PORT, () => {
     console.log(`Server is running on port: ${PORT}`);
})