const User = require('../models/user'); // requring user

// redering the singIN page
module.exports.signIn = function(req, res){
    return res.render('sign_in', {
        title : 'Sign-In'
    });
}
// creating the session, basically for logging In
module.exports.createSession = async function(req, res){
    // console.log(req.body);
    req.flash('success', 'You are logged In');
    return res.redirect('/');
}

// This function is used for rendering the signUp page

module.exports.signUp = function(req, res){
    return res.render('sign_up', {
        title : 'SignUp'
    });
}

// This fucntion is for creating the new user
module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirmPassword){
        //disply flash messages
        req.flash('error' , 'Password should be equal to Confirm Password');
        return res.redirect('back');
    }
    let user = await User.findOne({email : req.body.email});
    if(!user){
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            isAdmin : false
        });
        
        return res.redirect('/users/sign-in');
    }
    return res.redirect('back');
}

// This fucniton is used for logging Out
module.exports.destroySession = function (req, res, done){
    return req.logout((err) =>{
        if(err){
            return done(err);
        }
        req.flash('success' , 'Logged Out Sucessfully !');
        return res.redirect('/users/sign-in');
    });
    
}

// forrget password page

module.exports.forgetPasswordPage = function(req, res){
    return res.render('forget_password',{
        title : 'Forget Password'
    });
}
// this will update the existing password, with the newly created password.
module.exports.forgetPasswordLink = async function(req, res){
    let user = await User.findOne({ email: req.body.email });
    //console.log(user);
    //console.log(req.body);
    if(!user){
        return res.redirect('/users/signUp');
    }
    if(req.body.password == req.body.confirmPassword){
        req.flash('success' , 'Password Changed :)');
        user.password = req.body.password;
        await user.updateOne({password : req.body.password});
        return res.redirect('/users/sign-in');
    }
    return res.redirect('back');

}

// Adding employe, it is same as signUp , but it will redirect you to the addEmplyee page, where as 
// that will redirect you to the sing-in page
module.exports.addEmployeee = async function(req, res){
    if(req.body.password != req.body.confirmPassword){
        //disply flash messages
        req.flash('error' , 'Password should be equal to Confirm Password');
        return res.redirect('back');
    }
    let user = await User.findOne({email : req.body.email});
    if(!user){
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            isAdmin : false
        });
        
        return res.redirect('/admin/view-employee');
    }
    return res.redirect('back');
}

// THis function is used for making the new Admin, it is admin specific, fucntion
module.exports.makeAdmin = async function(req, res){
    try {
        if (req.body.admin_password == '1234') {
            let user = await User.findById(req.user.id );
            user.isAdmin = true;
            user.save();
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log('Error', error);
        return;
    }
}
