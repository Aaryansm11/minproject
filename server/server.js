// server.js

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const cors = require('cors');
const app = express();

const port = 3000;

app.use(express.json());
app.use(cors());

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

let db;

client.connect((err) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }
    console.log('Connected to MongoDB');
});

db = client.db('minip');
const itemCollection = 'items';

// Get items for a specific category
app.get('/items', async (req, res) => {
    try {
        const items = await db.collection(itemCollection).find().toArray();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add an item for a specific category
app.post('/items', async (req, res) => {
    const { category, item, qty, price } = req.body;
    try {
        const newItem = { category, item, qty, price };
        await db.collection(itemCollection).insertOne(newItem);
        res.json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete an item
app.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.collection(itemCollection).deleteOne({ _id: new ObjectId(id) });
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an item
app.patch('/items/:id', async (req, res) => {
    const { id } = req.params;
    const { item, qty, price } = req.body;
    try {
        const updatedItem = await db.collection(itemCollection).findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { item, qty, price } },
            { returnDocument: 'after' }
        );
        res.json(updatedItem.value);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/categories', async (req, res) => {
    try {
        const categoryInfo = await db.collection(itemCollection).aggregate([
            {
                $group: {
                    _id: null,
                    uniqueCategories: { $addToSet: '$category' },
                    totalQty: { $sum: '$qty' },
                    outOfStockCount: { $sum: { $cond: [{ $eq: ['$qty', 0] }, 1, 0] } },
                    totalValue: { $sum: { $multiply: ['$qty', '$price'] } },
                },
            },
        ]).toArray();

        res.json(categoryInfo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});