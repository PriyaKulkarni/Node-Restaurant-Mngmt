const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post(
    '/signup',
    passport.authenticate('signup', {session: false}),
    async (req, res, next) => {
        res.json({
            message: 'Signup successful',
            user: req.user
        });
    }
);

router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error('An error occurred.');
                        return next(error);
                    }
                    req.login(
                        user, 
                        { session: false },
                        async (error) => {
                            if (error) return next(error);

                            const payload = { _id: user._id, name: user.name };
                            const options = { expiresIn: '1h', issuer: 'Mindtree Corp', subject: user.name }
                            const token = jwt.sign({user: payload}, 'SECRET_KEY', options);
                            return res.json({ token });
                        }
                    );
                } catch(error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
)

module.exports = router;
