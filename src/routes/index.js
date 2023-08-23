// Import required modules
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

// Import models and middleware
const User = require("../../model/userSchema");
const auth = require("../../middleware/authenticate");
const Sliders = require("../../model/Slider");
const Blog = require("../../model/Blog");
const Service = require('../../model/Service');
const bookingServices = require("../../model/bookingService");
const bookingDateTimeData = require("../../model/DateTimeData");
const appointments = require('../../model/appointment');
const bookingUserData = require("../../model/UserData")
// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/uploadimage");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).fields([
  {name: 'profileimage', maxCount: 1},
  {name: 'outfitimage', maxCount: 2}
]);

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const slide = await Sliders.find();
    const blogs = await Blog.find();

    res.render("index", {
      slide: slide,
      blogs: blogs,
      isAuthenticated: req.session.isAuthenticated
    });
  } catch (error) {
    console.log("Error fetching home page:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Render blog page
router.get("/blog", async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.render("blog", {
      blogs: blogs,
      isAuthenticated: req.session.isAuthenticated

    });
  } catch (error) {
    console.log("Error fetching blog page:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Render login page
router.get("/login", function (req, res, next) {
  res.render("login",{
  });
});

// Render register page
router.get("/register", function (req, res, next) {
  res.render("register",{

  });
});

// Render booking page
router.get("/booking", async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const user = await User.findById(userId);
    const service = await Service.find();
    console.log(service)

    res.render("booking", {
      user: user, 
      service: service,
      isAuthenticated: req.session.isAuthenticated

    });
  } catch (error) {
    console.log("Error fetching booking page:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Handle service click
router.post("/service-click", (req, res) => {
  const clickedService = req.body.service;
  console.log("Clicked service:", clickedService);
  // You can process the clicked service data here as needed

  res.status(200).send("Service click received");
});

// register process
router.post("/register", upload, async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      country,
      state,
      password,
      cpassword,
      dateofbirth,
      occupation,
      garmentscolor,
      bodybuilt,
      complexion,
      sociallink,
      favoritecloset,
      message,
    } = req.body;

    // Get the file information from multer
    const image = req.files['profileimage'];
    const outfitimage = req.files['outfitimage']


    // Check if the file was uploaded successfully
    // if (!image) {
    //   return res.status(400).json({ message: "Image is required." });
    // }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.redirect("/register")
    }

    // password bcrypt
    const encryptpassword = await bcrypt.hash(password, 10);

    // Create a new User instance with the provided data, including the image file path
    const user = await User.create({
      firstname,
      lastname,
      email,
      phone,
      country,
      state,
      password: encryptpassword,
      cpassword: encryptpassword,
      dateofbirth,
      occupation,
      garmentscolor,
      bodybuilt,
      complexion,
      sociallink,
      favoritecloset,
      message,
      image: image ? image[0].path : '',
      outfitimage: outfitimage ? outfitimage.map(file=>file.path): [],
    });

    // generate token
    const token = jwt.sign(
      { id: user._id },
      "MYNAMEISSURYANARAYANAMALLIKWEBDEVLOPER",
      { expiresIn: "1h" }
    );
    user.token = token;
    // user.password = undefined;

    // Save the user to the database
    await user.save();

    //redirect to the login page after successful registration
    res.redirect("/login");
  } catch (error) {
    console.log("Some error in register process try page", error);
    res
      .status(500)
      .json({ message: "Registration failed. Please try again later." });
  }
});

// Handle login process
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send('Please provide both email and password');
    }

    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user._id },
        'MYNAMEISSURYANARAYANAMALLIKWEBDEVLOPER',
        { expiresIn: '1h' }
      );

      user.token = token;
      await user.save();

      res.cookie('token', token, {
        httpOnly: true,
      });

      req.session.isAuthenticated = true;
      req.session.userId = user._id;

      return res.status(200).redirect('/');
    } else {
      return res.status(400).send({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.log("Error in login process:", error);
    res.status(500).send('An error occurred during login');
  }
});

// Render profile page
router.get("/profile", auth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    console.log(user)

    if (!user) {
      return res.status(404).redirect("/login");
    }

    res.render("profile", { user: user,
      isAuthenticated: req.session.isAuthenticated
     });
  } catch (error) {
    console.log("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Handle logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).redirect("/login");
});

// Render contact us page
router.get("/contact-us", function (req, res, next) {
  res.render("contact",{
    isAuthenticated: req.session.isAuthenticated

  });
});

// Render about us page
router.get("/about-us", function (req, res, next) {
  res.render("about",{
    isAuthenticated: req.session.isAuthenticated
  });
});

// Render privacy policy page
router.get("/privacy-policy", function (req, res, next) {
  res.render("privacy",{
    isAuthenticated: req.session.isAuthenticated
  });
});
router.get("/what-is-included", function (req, res, next) {
  res.render("includes",{
    isAuthenticated: req.session.isAuthenticated
  });
});
router.get("/how-it-works", function (req, res, next) {
  res.render("works",{
    isAuthenticated: req.session.isAuthenticated
  });
});

// Handle service process
router.post("/booking", async (req, res) => {

  const { serviceName, duration, price, selectedDate, selectedTime, firstName, lastName, Email, Phone,Country, State, Note,DOB,Occupation,Garments, BodyBuilt,Complexion,sociallink,favoritecloset,bookinMessage } = req.body;

   var appointmentServiceName = serviceName
   var appointmentDuration =duration
   var appointmentPrice = price
   var appointmentSelectedDate = selectedDate
   var appointmentSelectedTime = selectedTime
   var appointmentUserfirstName = firstName
   var appointmentUserlastName = lastName
   var appointmentUserEmail = Email
   var appointmentUserPhone = Phone
   var appointmentUserCountry =Country
   var appointmentUserState =State
   var appointmentUserNote = Note
   var appointmentUserDOB = DOB
   var appointmentUserOccupation = Occupation
   var appointmentUserGarments = Garments
   var appointmentUserBodyBuilt = BodyBuilt
   var appointmentUserComplexion = Complexion
   var appointmentUsersociallink = sociallink
   var appointmentUserfavoritecloset = favoritecloset
   var appointmentUserbookinMessage = bookinMessage


//    if(appointmentServiceName == undefined || appointmentDuration == undefined || appointmentPrice == undefined ||appointmentSelectedDate == undefined || appointmentSelectedTime == undefined || !appointmentUserfirstName || !appointmentUserlastName  || !appointmentUserEmail || !appointmentUserPhone || !appointmentUserNote){
//    res.status(400).json({ error: "Data saved successfully" });
// console.log("Booking not completed");
//    }
//    else {
  const appointmentsbooking = await appointments.create({
    appointmentServiceName,
    appointmentDuration,
    appointmentPrice,
    appointmentSelectedDate,
    appointmentSelectedTime,
    appointmentUserfirstName,
    appointmentUserlastName,
    appointmentUserEmail,
    appointmentUserPhone,
    appointmentUserCountry,
    appointmentUserState,
    appointmentUserNote,
    appointmentUserDOB,
    appointmentUserOccupation,
    appointmentUserGarments,
    appointmentUserBodyBuilt,
    appointmentUserComplexion,
    appointmentUsersociallink,
    appointmentUserfavoritecloset,
    appointmentUserbookinMessage
    });

  await appointmentsbooking.save();

  res.status(200).json({ message: "Data saved successfully" });
  //  }
});


router.post('/sentMail',(req,res)=>{
  const {serviceName, duration, price, selectedDate, selectedTime, firstName, lastName, Email} = req.body

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'burnice.stroman@ethereal.email',
        pass: 'e42QPptbS34H3nBssM'
    }
});

  const mailOptions = {
    from: "factytoka@gmail.com",
    to: Email,
    subject: "Booking Confirmed successfully",
    text: `Hi ${firstName} ${lastName}. You have choosed ${serviceName}. Date ${selectedDate} and time ${selectedTime}`
  }

  transporter.sendMail(mailOptions, (err, info)=>{
    if(err){
      console.log(err)
      res.send("error sendng mail");
    }
    else{
      console.log('Email sent: ' +info.response)
      res.send('Email sent successfully');
    }
  })

})


module.exports = router;