const mongoose= require("mongoose")

const Services = mongoose.Schema({
    serviceImage: String,
    serviceName: String,
    duration: String,
    price: Number
})

const Service=mongoose.model('Service', Services)

module.exports = Service;