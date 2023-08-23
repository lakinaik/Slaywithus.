const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require:true
  },
  lastname: {
    type: String,
    require:true
  },
  email: {
    type: String,
    require:true
  },
  phone: {
    type: Number,
    require:true
  },
  country: {
    type: String,
    require:true
  },
  state: {
    type: String,
    require:true
  },
  password: {
    type: String,
    require:true
  },
  cpassword: {
    type: String,
    require:true
  },
  dateofbirth: {
    type: String,
  },
  occupation: {
    type: String,
  },
  garmentscolor: [{
    type: String,
  }],
  bodybuilt: {
    type: String,
  },
  complexion: {
    type: String,
  },
  sociallink: {
    type: String,
  },
  image: {
    type: String,
  },
  outfitimage: [
    {
      type: String,
    }
  ],
  favoritecloset: {
    type: String,
  },
  message: {
    type: String,
  },
  token: {
    type: String,
    default: null,
  },
});

// generate token
// userSchema.methods.generateAuthToken = async function () {
//   try {
//     let token;
//     token = jwt.sign(
//       { _id: this._id },
//       "MYNAMEISSURYANARAYANAMALLIKWEBDEVLOPER"
//     );
//     this.tokens = this.tokens.concat({ token: token });
//     await this.save();
//     return token;
//   } catch (error) {
//     console.log(error);
//   }
// };

const User = mongoose.model("user", userSchema);

module.exports = User;
