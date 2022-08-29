import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import "dotenv/config"

const client = new MongoClient(process.env.MONGO_URI)
const database = client.db("final-project-api")
const metas = database.collection("metas")

client.connect()
console.log("Mongo connected")

const app = express()
app.use(cors())
app.use(express.json())

app.listen(4040, () => console.log(`api listening on port 4040`))

// Get
app.get("/", async (req, res) => {
  const allMetas = await metas.find().toArray()
  res.send(allMetas)
})

// Post
app.post("/", async (req, res) => {
  await metas.insertOne(req.body)
  res.send(["New meta was posted"])
})

// Delete
app.delete("/", (req, res) => {
  metas.findOneAndDelete(req.query)
})

// Put
app.put("/", (req, res) => {
  metas.findOneAndUpdate(req.query, { $set: req.body })
})
