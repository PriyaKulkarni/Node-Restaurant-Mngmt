let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Add new restaurant', () => {
    xit('Should add a new Restaurant', (done) => {
        chai.request(server)
            .post('/api/addRestaurant')
            .send({
                "restaurantName": "CPK",
                "userRating": 4.5,
                "budget": 1200,
                "location": "Mumbai",
                "cuisine": ["Continental", "Non-veg"],
                "menu": [
                    { "dishName": "Peppered Pasta Salad", "price": 650 },
                    { "dishName": "Baked Potato And Aubergines", "price": 800 }
                ]
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            })
    })

    it('Should not add Restaurant with same name', (done) => {
        chai.request(server)
            .post('/api/addRestaurant')
            .send({
                "restaurantName": "CPK",
                "userRating": 4.5,
                "budget": 300,
                "location": "Mumbai",
                "cuisine": ["Continental", "Non-veg"],
                "menu": [
                    { "dishName": "Peppered Pasta Salad", "price": 650 },
                    { "dishName": "Baked Potato And Aubergines", "price": 800 }
                ]
            })
            .end((err, res) => {
                if(err) done(err);
                res.body.should.have.property('code','400');
                res.body.should.have.property('status','Error');
                done();
            })
    })

    it('Should not add Restaurant with missing fields', (done) => {
        chai.request(server)
            .post('/api/addRestaurant')
            .send({
                "restaurantName": "CPK",
                "budget": 300,
                "location": "Mumbai",
                "cuisine": ["Continental", "Non-veg"],
                "menu": [
                    { "dishName": "Peppered Pasta Salad", "price": 650 },
                    { "dishName": "Baked Potato And Aubergines", "price": 800 }
                ]
            })
            .end((err, res) => {
                if(err) done(err);
                res.body.should.have.property('code','400');
                res.body.should.have.property('status','Error');
                done();
            })
    })
});