const request = require('supertest');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = require('../src/App'); // Assurez-vous que le chemin vers votre app est correct

jest.mock('fs'); // Mock le module fs pour éviter d'écrire réellement dans le système de fichiers

describe('API Endpoints', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(done); // Utilisez app.listen pour démarrer le serveur
    });

    afterAll((done) => {
        server.close(done);
    });

    beforeEach(() => {
        fs.existsSync.mockReturnValue(true); // Simule l'existence du fichier
        fs.readFileSync.mockReturnValue(JSON.stringify([])); // Simule la lecture d'un fichier vide
        fs.writeFileSync.mockClear(); // Réinitialise le mock de writeFileSync
    });

    describe('GET /products', () => {
        it('should return a list of products', async () => {
            const response = await request(server).get('/products');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('POST /products', () => {
        it('should create a new product', async () => {
            const newProduct = {
                name: 'Test Product',
                description: 'This is a test product',
                price: 10.99
            };
            const response = await request(server)
                .post('/products')
                .send(newProduct);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(newProduct.name);
            expect(response.body.description).toBe(newProduct.description);
            expect(response.body.price).toBe(newProduct.price);
            expect(fs.writeFileSync).toHaveBeenCalled(); // Vérifie que le fichier a été écrit
        });
    });
});