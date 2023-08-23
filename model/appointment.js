const mongoose= require("mongoose")


  const appointment = mongoose.Schema({
    appointmentServiceImage: String,
    appointmentServiceName: String,
    appointmentDuration: String,
    appointmentPrice: String,
    appointmentSelectedDate: String,
    appointmentSelectedTime: String,
    appointmentUserfirstName: String,
    appointmentUserlastName: String,
    appointmentUserEmail: String,
    appointmentUserPhone: String,
     appointmentUserCountry: String,
    appointmentUserState: String,
    appointmentUserNote: String,
    appointmentUserDOB: String,
    appointmentUserOccupation: String,
    appointmentUserGarments: [
      {
        type : String
      },
    ],
    appointmentUserBodyBuilt: String,
    appointmentUserComplexion: String,
    appointmentUsersociallink: String,
    appointmentUserfavoritecloset: String,
    appointmentUserbookinMessag: String
})

const appointments =mongoose.model('appointment', appointment )

module.exports = appointments;