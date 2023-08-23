const mongoose= require("mongoose")

const bookingService = mongoose.Schema({
    serviceImage: String,
    serviceName: String,
    duration: String,
    price: String
})

const bookingServices=mongoose.model('bookingServices', bookingService)

module.exports = bookingServices;