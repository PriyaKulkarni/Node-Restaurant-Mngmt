const UserModel = require('../models/model');
const jwt = require('jsonwebtoken');

exports.updateUser = (req, res, next) => {
    try {
        console.log("reqBody",req.body);
        const options = { issuer: 'Mindtree Corp', subject: req.user.name }
        jwt.verify(req.query.secret_token, 'SECRET_KEY', options, function(err, decoded) {
            if(err) {
                throw err;
            }
            if(req.user.name === req.body.name) {
                return res.status(13).json({message: 'Not authorized to edit own data'});
            }
            // const returnData = UserModel.update({name: req.body.name},
            //                                     {$set: 
            //                                         {
            //                                             active: (req.body.active.toLowercase() === 'true')
            //                                         }
            //                                     });
            // return res.status(200).json({
            //     message: 'Updated successfully',
            //     data: returnData
            // });
        });

    } catch(error) {
        return res.json({status: 500, error: error.stack});
    }
}