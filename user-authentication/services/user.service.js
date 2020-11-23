const UserModel = require('../models/model');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req,res) => {
    try {
        const limit = (req.params && Number(req.params.limit)) || (req.query && Number(req.query.limit)) || 10;
        const skip = (req.params && Number(req.params.skip)) || (req.query && Number(req.query.skip)) || 0;
        const users = await UserModel.find().limit(limit).skip(skip).select("-password");
        if(!users) {
            return res.json({status: 400, message: 'No Users found'});
        }
        return res.json({status: 200, data: users});
    } catch(err) {
        return res.json({status: 500, error: error.stack});
    }
}

exports.updateUser = (req, res, next) => {
    try {
        // console.log("reqBody",req.body, req.user);
        const options = { issuer: 'Mindtree Corp', subject: req.user.name }
        jwt.verify(req.query.secret_token, 'SECRET_KEY', options, async function(err, decoded) {
            if(err) {
                // console.log(err);
                throw err;
            }
            if(req.user.name === req.body.name) {
                return res.json({status: 404, error: 'Not authorized to edit own data'});
            }
            const returnData = await UserModel.update({name: req.body.name},
                                                {$set: 
                                                    {
                                                        active: req.body.active.toLowerCase()
                                                    }
                                                });
            // console.log(returnData);
            return res.json({
                status: 200,
                message: 'Updated successfully'
            });
        });

    } catch(error) {
        return res.json({status: 500, error: error.stack});
    }
}