const fs = require('fs');
const path = require('path');

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

const newProduct = {
    name: 'Sample Product',
    price: 100,
    description: 'This is a sample product'
};

const products = readData();
products.push(newProduct);
writeData(products);

console.log('Product added successfully');