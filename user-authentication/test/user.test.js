const { defaultTestUser, loginWithDefaultTestUser  } = require("./common.test");
const server = require('../index');
const chaiHttp = require('chai-http');
const chai = require("chai");
const should = chai.should();
chai.use(chaiHttp);

let token;
 
describe("# Test User APIs", () => { 
 
    before(async ()=> {
        let response = await loginWithDefaultTestUser();
        token = response.body.token;
    })

    it("should get all Users", (done) => {    
        const server = require('../index');   
        chai.request(server)
            .get('/user/getAllUsers')
            .query({'secret_token': token})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
                done();
            });
    });
});