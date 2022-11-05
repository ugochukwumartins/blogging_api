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
            user_name : 'ugo', 
            password: 'Password123', 
            first_name: 'ugob',
            last_name: 'Augustina',
            email: 'ugo66@mail.com',
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

        expect(response.status).toBe(302)
        //expect(response.body).toHaveProperty('message')
          
    })



     it('should  get a published blog', async () => {
      

    
        const response = await request(app)
        .get('/get_a_published_blog')
        .set('content-type', 'application/json')
        ;
    console.log(response._data)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message')
          
    })

    it('should update blog  details by id', async () => {
      

    
        const response = await request(app)
        .post('/updateBlogdetails/6364dd4cf1d1d027d5581042')
        .set('content-type', 'application/json')
        ;
    console.log(response._data)

        expect(response.status).toBe(302)
      
          
    })

    it('should create blog ', async () => {
      

    
        const response = await request(app)
        .post('/create_blog')
        .set('content-type', 'application/json')
        ;
    console.log(response._data)

        expect(response.status).toBe(401)
       
          
    })

    it('get a published blog by author ', async () => {
      

    
        const response = await request(app)
        .get('/get_a_published_blog_byAuthor/:author/:page?')
        .set('content-type', 'application/json')
       ;
    console.log(response._data)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message')
          
    })

    it('should get update blog by id ', async () => {
      

    
        const response = await request(app)
        .get('/updateBlog/:id')
        .set('content-type', 'application/json')
      ;
    console.log(response._data)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message')
          
    })

   

    it('get all publish blog', async () => {
      

    
        const response = await request(app)
        .get('/:page?')
        .set('content-type', 'application/json')
        ;
    console.log(response._data)

        expect(response.status).toBe(200)
       
          
    })




    
})