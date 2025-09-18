const User = require("../models/user");
require('dotenv').config();
const NodeGeocoder = require('node-geocoder');
const options = {
    provider: 'google',
    apiKey: process.env.MAP_API_KEY,
};

const geocoder = NodeGeocoder(options);

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup");
};

module.exports.signup = async (req, res) => {
    try {

        let {
            username,
            email,
            password,
            contactNumber,
            skills,
            location,
            country
        } = req.body;
       
        const newUser = new User({
            username,
            email,
            contactNumber,
            skills,
            location,
            country
        });

     

        newUser.image.filename = req.file.filename;
        newUser.image.url = req.file.path;

        const result = await geocoder.geocode(`${newUser.country} ${newUser.location}`);
        newUser.coordinates = {
            type: "Point",
            coordinates: [result[0].longitude, result[0].latitude]
        };




        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Helping Hearts");
            return res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login")
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Helping Hearts");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    return res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "logged out");
        return res.redirect("/listings");
    });
};

module.exports.home = (req, res) => {
    return res.redirect("/listings");
};