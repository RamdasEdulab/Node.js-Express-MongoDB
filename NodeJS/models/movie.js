const mongoose = require('mongoose');

var Movie = mongoose.model('Movie',{
    name: {
        type: String,
        required: 'This field is required.'
    },
    image:{type:String,
        required: 'This field is required.'
    },
    summary: {
        type: String,
        required: 'This field is required.'
    }, 
});

module.exports = { Movie};
