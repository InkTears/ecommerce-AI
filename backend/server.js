const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Importer uuid pour générer des identifiants uniques

const app = express();
app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'products.json');

// Helper function to read data from JSON file
const readData = () => {
    if (!fs.existsSync(dataFilePath)) {
        return [];
    }
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

// Helper function to write data to JSON file
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

app.get('/products', (req, res) => {
    const products = readData();
    res.json(products);
});

app.post('/products', (req, res) => {
    const products = readData();
    const newProduct = { ...req.body, id: uuidv4() }; // Ajouter un identifiant unique
    products.push(newProduct);
    writeData(products);
    res.json(newProduct);
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});