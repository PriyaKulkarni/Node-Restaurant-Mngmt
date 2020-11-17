  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    restaurantID: {
        required: true,
        type: Schema.Types.ObjectId,
    },
    restaurantName: {
        required: true,
        type: String,
    },
    filename: {
        required: true,
        type: String,
    },
    fileId: {
        required: true,
        type: String,
    },
    uploadedDate: {
        default: Date.now(),
        type: Date,
    },
});

module.exports = mongoose.model('Image', ImageSchema);
