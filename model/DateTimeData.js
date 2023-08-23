const mongoose= require("mongoose")


  const DateTimeData = mongoose.Schema({
    selectedDate: Number,
    selectedTime: String,
})

const bookingDateTimeData =mongoose.model('DateTimeData', DateTimeData )

module.exports = bookingDateTimeData;