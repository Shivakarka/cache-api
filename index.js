const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MAX_SIZE = parseInt(process.env.MAX_SIZE) || 10;

// Cache object to store key-value pairs
const cache = {};

app.use(express.json());
app.use(cors());

// POST /cache - Add or update a key-value pair in the cache
app.post('/cache', (req, res) => {
    const { key, value } = req.body;
    if (!key || value === undefined) {
        return res.status(400).json({ error: "Both key and value are required."});
    }

    if (cache.hasOwnProperty(key)) {
        cache[key] = value;
        return res.status(200).json({ message: 'Key updated successfully' });
      } else {
        if (Object.keys(cache).length >= MAX_SIZE) {
          return res.status(507).json({ error: 'Cache is full' });
        }
        cache[key] = value;
        return res.status(201).json({ message: 'Key added successfully' });
      }
});

// GET /cache/:key - Get the value of a key from the cache
app.get('/cache/:key', (req, res) => {
    const key = req.params.key;
    if (cache.hasOwnProperty(key)) {
      res.json({value: cache[key]});
    } else {
      res.status(404).json({ error: "Key not found"});
    }
});

// DELETE /cache/:key - Delete a key from the cache
app.delete('/cache/:key', (req, res) => {
    const key = req.params.key;
    if (cache.hasOwnProperty(key)) {
      delete cache[key];
      res.json({ message:"Key deleted successfully." });
    } else {
      res.status(404).json({ error:"Key not found." });
    }
});
  

app.listen(port,() => {
    console.log(`Cache API is running on port ${port} with a maximum size of ${MAX_SIZE}`);
}); 