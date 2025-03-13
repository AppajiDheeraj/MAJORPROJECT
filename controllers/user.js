const User = require('../models/user');

module.exports.renderSignUpPage = (req,res) => {
    res.render("users/signup");
};

module.exports.signUpUser = async (req,res) => {
    try{
        const {username, email, password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err) return next(err);
            req.flash("success", "Welcome to WanderLust!");
            res.redirect("/login");
        });
    }
    catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginPage = (req,res) => {
    res.render("users/login");
};

module.exports.loginUser = async (req,res) => {
    req.flash("success","Welcome back to WanderLust! You are now logged in");
    res.redirect(res.locals.redirectUrl || '\listings'); //Redirect to the saved URL or /listings
};

module.exports.logoutUser = (req,res,next)=> {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You are now logged out!");
        res.redirect("/listings");
    })
}