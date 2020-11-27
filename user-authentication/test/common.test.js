const server = require('../index');
const UserModel = require('../models/model');
const chaiHttp = require('chai-http');
const chai = require("chai");
chai.use(chaiHttp);
 
exports.defaultTestUser = { "name": "test", "password": "test@123" };
 
exports.getDefaultTestUser = async () => {
    return await UserModel.findOne({ "name" : this.defaultTestUser.name });
};
 
exports.loginWithDefaultTestUser = async () => {
    return chai.request(server)
                .post('/login')
                .send({ 
                    "name": this.defaultTestUser.name, 
                    "password": this.defaultTestUser.password 
                });
};
 
exports.cleanDefaultTestUser = async () => {
    return await UserModel.deleteOne({ "name": this.defaultTestUser.name});    
};