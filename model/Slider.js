const mongoose= require("mongoose")

const Slider = mongoose.Schema({
    imageUrl: String,
    class: String
})

const Sliders=mongoose.model('slider', Slider)

module.exports = Sliders;