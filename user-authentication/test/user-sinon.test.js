const sinon = require('sinon');
const passport = require('passport');

const chaiHttp = require('chai-http');
const chai = require("chai");
const should = chai.should();
chai.use(chaiHttp);

 
describe("# User APIs Test with Sinon", () => { 
 
    before(()=> {
        sinon.stub(passport, 'authenticate').callsFake(function (test, args) {
            callback(null, { "name": "test"}, null);
            return (req,res,next)=>{};
        });
    })

    after(() => {
        passport.authenticate.restore();
    }); 
    
    xit("should get user profile", (done) => {    
        const server = require('../index');   
        chai.request(server)
            .get('/user/profile')
            .end((err, res) => {
                console.log(res.body,err);
                res.should.have.status(200);
                // res.body.should.be.a('array');
                done();
            });
    });

    xit("should get all Users", (done) => {    
        const server = require('../index');   
        chai.request(server)
            .get('/user/getAllUsers')
            .end((err, res) => {
                console.log(res.body,err);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});