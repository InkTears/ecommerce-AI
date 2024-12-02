const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../backend/server');

jest.mock('fs');
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('API Endpoints', () => {
    beforeEach(() => {
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue(JSON.stringify([]));
        fs.writeFileSync.mockClear();
    });

    it('GET /products should return an empty array', async () => {
        const response = await request(app).get('/products');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('POST /products should add a new product', async () => {
        const newProduct = { name: 'Test Product', price: 50, description: 'Test Description' };
        const response = await request(app).post('/products').send(newProduct);
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(newProduct);
        expect(response.body).toHaveProperty('id');
        expect(fs.writeFileSync).toHaveBeenCalled();
    });
});

describe('addProducts.js', () => {
    const dataFilePath = path.join(__dirname, '../backend/products.json');

    beforeEach(() => {
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue(JSON.stringify([]));
        fs.writeFileSync.mockClear();
    });

    it('should read data from JSON file', () => {
        const { readData } = require('../backend/addProducts');
        const data = readData();
        expect(data).toEqual([]);
    });

    it('should write data to JSON file', () => {
        const { writeData } = require('../backend/addProducts');
        const data = [{ name: 'Test Product', price: 50, description: 'Test Description' }];
        writeData(data);
        expect(fs.writeFileSync).toHaveBeenCalledWith(dataFilePath, JSON.stringify(data, null, 2));
    });

    it('should add a new product to the JSON file', () => {
        const { addProduct } = require('../backend/addProducts');
        const newProduct = { name: 'Test Product', price: 50, description: 'Test Description' };
        addProduct(newProduct);
        expect(fs.writeFileSync).toHaveBeenCalled();
    });
});