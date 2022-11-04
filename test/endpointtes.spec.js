const request = require('supertest')
const { connectToDb }  = require("../db");
const UserModel = require('../models/userModel')
const blogmodel = require("../models/blogModel");

const app = require("../app");
const blogRoute = require("../routes/blogging");
const httpreq = require("../routes/request");

describe('Auth: Signup', () => {
 

    

    it('should signup a user', async () => {
        const response = await request(app).post('/register')
        .set('content-type', 'application/json')
        .send({ 
            user_name : 'tobiw', 
            password: 'Password123', 
            first_name: 'tobie',
            last_name: 'Augustina',
            email: 'tobi@mail.com',
            age:34
        })

        expect(response.status).toBe(200)
       
           
    })


    it('should login a user', async () => {
      

    
        const response = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({ 
            username: 'tobiw', 
            password: 'Password123'
        });
    console.log(response._data)

        expect(response.status).toBe(200)
       // expect(response.body).toHaveProperty('{}') 
          
    })

    it('should update blog ', async () => {
      

    
        const response = await request(app)
        .post('/updateBlogdetails/6364dd4cf1d1d027d5581042')
        .set('content-type', 'application/json')
        .send({ 
            username: 'tobiw', 
            password: 'Password123'
        });
    console.log(response._data)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message')
          
    })



    
})