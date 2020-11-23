let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('/Search Restaurant', () => {
    it('By Restaurant Name', (done) => {
        chai.request(server)
            .get('/api/search')
            .query({ restaurantName: 'Pizzeria'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/By User Rating', (done) => {
        chai.request(server)
            .get('/api/search')
            .query({ userRating : 4 })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/By Budget', (done) => {
        chai.request(server)
            .get('/api/search')
            .query({ budget : 400 })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
})