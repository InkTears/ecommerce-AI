const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'products.json');

const readData = () => {
    if (!fs.existsSync(dataFilePath)) {
        return [];
    }
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

const addProduct = (product) => {
    const products = readData();
    products.push(product);
    writeData(products);
};

module.exports = {
    readData,
    writeData,
    addProduct
};