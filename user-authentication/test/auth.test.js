const { defaultTestUser, getDefaultTestUser, cleanDefaultTestUser, loginWithDefaultTestUser  } = require("./common.test");
const server = require('../index');
const chaiHttp = require('chai-http');
const chai = require("chai");
const should = chai.should();
chai.use(chaiHttp);

describe("# Auth APIs", () => {

    before(async () => {
        const testUser = await getDefaultTestUser();
        if(testUser) {
            await cleanDefaultTestUser();
        }
    });

    it("should create user", (done) => {
        chai.request(server)
            .post('/signup')
            .send(defaultTestUser)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
 
    it("should retrieve the token", (done) => {
            loginWithDefaultTestUser()
                .then(res => {
                    res.should.have.status(200);
                    res.body.token.should.not.be.empty;
                    done();
                });
    });
 
    it("should not login with the right user but wrong password", (done) => {
        chai.request(server)
            .post('/login') 
            .send({ "name": defaultTestUser.name, "password": "random" })
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
});