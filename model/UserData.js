const mongoose= require("mongoose")

const UserData = mongoose.Schema({
    firstName: String,
    lastName: String,
    Email: String,
    Phone: String,
    Note: String,
})

const bookingUserData=mongoose.model('UserData', UserData)

module.exports = bookingUserData;