const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const UserModel = require('../models/model');

passport.use(
    'signup', 
    new LocalStrategy(
        {
            usernameField: 'name',
            passwordField: 'password'
        },
        async (name, password, done) => {
            try {
                const userModel = new UserModel({
                    name: name,
                    password: password
                });
                // console.log(userModel);
                const user = await userModel.save();
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'name',
            passwordField: 'password'
        },
        async (name, password, done) => {
            try {
                const user = await UserModel.findOne({ name });
                if(!user) {
                    return done(null, false, 'User does not exist');
                }
                const checkPassword = await user.comparePassword(password);
                if (!checkPassword) {
                    return done(null, false, { message: 'Wrong Password' });
                }
    
                return done(null, user, { message: 'Logged in Successfully' });
            } catch(error) {
                done(error);
            }
        }
    )
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'SECRET_KEY',
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
        },
        async (token, done) => {
            try {
                console.log("jwt");
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);
