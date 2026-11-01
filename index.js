import cors from 'cors';
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config'

const app = express()
const PORT = 5000;

app.use(cors())
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
 const socialClient = await connectToMongoDB()
 const db = socialClient.db("social-event")
 const socialEventCollection = db.collection("events")
 const joinedEventCollection = db.collection("join-events")
// mongodb end

app.post('/events', async (req, res) =>{
       const data = req.body
       const result = await socialEventCollection.insertOne(data)
       res.send(result)
})

app.get('/events', async (req, res) => {
        const result = await socialEventCollection.find().toArray()
        res.send(result);
})



app.get('/resent-events', async(req, res) =>{
      const result = await socialEventCollection.find().sort({ _id: -1 }).limit(6).toArray()
      res.send(result)
})

app.get('/allevents/:id', async (req, res) =>{
     const {id} = req.params
     const result = await socialEventCollection.findOne({_id: new ObjectId(id)})
     res.send(result)
})
app.patch('/events/:id', async(req, res) =>{
          const { id } = req.params;
          const data = req.body;
          const result = await socialEventCollection.updateOne(
            {_id: new ObjectId(id)},
             { $set: data },
        );
        res.send(result)
});
app.get('/events/:email', async(req, res) =>{
      const {email} = req.params;
      const result = await socialEventCollection.find({email:email}).toArray()
      res.send(result)
})

app.delete('/events/:id', async (req, res) =>{
         const {id} = req.params;
         const result = await socialEventCollection.deleteOne({_id: new ObjectId(id)})
         res.send(result)
});

app.post('/events-join', async(req, res) =>{
       const data = req.body;
       const result = await joinedEventCollection.insertOne(data);
       res.send(result)
})

app.get('/events-join', async(req, res) =>{
     const result = await joinedEventCollection.find().toArray()
     res.send(result)
})

app.delete('/events-join/:id', async (req, res) =>{
       const {id} =  req.params;
       const result = await joinedEventCollection.deleteOne({_id: new ObjectId(id)})
       res.send(result)
})




// http://localhost:5000/events-join
app.get('/', (req, res) =>{
     res.send({msg:'server is running...bappi'})
})

app.listen(PORT, () => {
     console.log(`Server is running on port: ${PORT}`);
})