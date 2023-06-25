const mongoose = require('mongoose');
// This is Schema for review, it will contain the content of review, and the reviwer and reviewed 

const reviewSchema = mongoose.Schema({
    content : {
        type : 'String',
        require : true
    },
    reviewer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    reviewed : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
},
{
    timestamps: true,
}
);

const Review = mongoose.model('Review' , reviewSchema);
module.exports = Review;