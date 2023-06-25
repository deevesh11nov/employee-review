// include User and Review Schema //
const User = require('../models/user')
const Review = require('../models/review')

// create riview controller fumction //
module.exports.newReview = async (req, res) => {

    try {
        // first find recieoient //
        let recipient = await User.findById(req.params.id);
        // console.log(recipient + " recipient ");
        if (!recipient) {
            console.log("Recipient is not valid");
            return res.redirect('/');
        }

       //console.log(recipient._id);
        for(let i = 0; i<req.user.userToReview.length ; i++){
            if (req.user.userToReview[i] == recipient.id) {
                // console.log("Entered in the loop");
                let deleted = req.user.userToReview.splice(i, 1);
                //console.log(deleted);
                req.user.save();
                //break;
            }
        }

        // we just take reviewer and reviewed 
        for (let i = 0; i < recipient.reviewRecivedFrom.length; i++){
            if (req.user) {
                if (recipient.reviewRecivedFrom[i] == req.user.id) {
                    req.user.userToReview.pop(i);
                    // recipient.reviewRecivedFrom.save();
                    const new_review = Review.create({
                       reviewer : recipient.id,
                        reviewed: req.user.id,
                        content: req.query.newReview,
                    });
                    // if ther is no any new review //
                    if (!new_review) {
                        console.log("Review is not created");
                    }
                    // recipient.reviewRecivedFrom.splice(i, 1);

                    return res.redirect('/');
                }
            } else {
                console.log("user is not loggin");
                req.flash('error' , "Please LogiN yourself !");
                return res.redirect("/users/sign-in");
            }
        }
        return res.redirect('/');
    } catch (err) {
        console.log('error', err);
        return;
   }
}