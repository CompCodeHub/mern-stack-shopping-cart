const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
}, {
    versionKey: false
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;