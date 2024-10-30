process.env.NODE_ENV = 'test'
const request = require('supertest')

const app = require('./app')
const items = require('./fakeDb')

let pocky = {name:"pocky", price:0.99}
let cherries = {name:"cherries", price:4.09}

beforeEach(function(){
    items.push(pocky,cherries);
    console.log(items)
})

afterEach(function() {
    items.length = 0;
})

describe("GET /items", function() {
    test("Gets a list of items", async function() {
        const res = await request(app)
        .get('/items')
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            [
                {name:"pocky", price:0.99},
                {name:"cherries", price:4.09}
            ]
        )
    })
})

describe("POST /items", function() {
    test("Creates new item", async function() {
        const res = await request(app)
            .post('/items')
            .send({
                name: "watermelon",
                price: 10.00
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
                item: {
                name: "watermelon",
                price: 10.00
            }
        });
    });
});

describe("GET /items/:name", function() {
    test("Gets individual item", async function() {
        const res = await request(app)
        .get('/items/pocky')

        expect(res.status).toBe(200);
        expect(res.body).toEqual({item:{name:"pocky", price:0.99}})
    })
})

describe("PATCH /items/:name", function() {
    test("Updates a single item", async function() {
        const res = await request(app)
            .patch('/items/pocky')
            .send({
                price: 1.99
            });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            item: {name:"pocky", price:0.99},
            updated: {name:"pocky", price:1.99}
        })
    })
})

describe("DELETE /items/:name", function() {
    test("Deletes a single item", async function() {
        const res = await request(app)
        .delete('/items/pocky')
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message : "Deleted"})
    })
})

