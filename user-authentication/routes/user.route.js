const express = require('express');
const router = express.Router();

const updateUserService = require('../services/user.service');

router.get(
  '/profile',
  (req, res, next) => {
    console.log(req.params);
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token
      //token: req.header('authorization');
    })
  }
);

router.post('/update', updateUserService.updateUser);

module.exports = router;