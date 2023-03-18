const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();
var jwt = require('jsonwebtoken');
const multer = require("multer");
const path = require("path");
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
// const { DownloaderHelper } = require('node-downloader-helper');
const download = require('download');


const JWT_SECTRT = 'amitisaplayer';

router.post('/createemp', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('age', 'Enter a valid age').isInt({ min: 10 }),
  body('email', 'Enter a valid email').isEmail({ min: 10 }),
  body('salary', 'Enter a valid salary').isLength({ min: 3 }),
  body('country', 'Enter a valid country').isLength({ min: 1 }),
  body('state', 'Enter a valid state').isLength({ min: 1 }),
  body('city', 'Enter a valid city').isLength({ min: 1 }),
  body('password').isLength({ min: 5 }),
  body('confirmpassword').isLength({ min: 5 }),
], async (req, res) => {
  //if there are errors, return Bad request and the errors
  // console.log(req.body, "req");
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let msg = errors.array();
      let msg1 = msg[0].msg;
      console.log(msg1, "eroooo");
      return res.status(400).json({ errors: msg1, error: "401" });
    }
    // Check whether the user with this employee exists already
    let employee = await Employee.findOne({ email: req.body.email });
    if (employee) {
      return res.status(400).json({ error: "404" });
    }
    // Create a new Employee
    if (req.body.password != req.body.confirmpassword) {
      return res.status(400).json({ error: "Sorry! Password is not matched" });
    }
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);
    console.log("pass")
    employee = await Employee.create({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      salary: req.body.salary,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      password: secPass,
    });
    console.log(employee)
    const data = {
      employee: {
        id: employee.id
      }
    }
    success = true;
    //   const authtoken = jwt.sign(data, JWT_SECTRT);
    // console.log(authtoken);
    res.json({ success, data });
    // res.json(authtoken);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
})

router.post('/login', [
  body('signupEmail', 'Enter valid Email').isEmail(),
  body('password', 'Password cannot be blank').exists(),

], async (req, res) => {
  console.log(req.body)
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { signupEmail, password } = req.body;
  try {
    let user = await Employee.findOne({ email: signupEmail });
    if (!user) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credential" });
    }
    let hardCodedPassword_admin = "$2a$10$qM/qvLarR3c.2tMG145cg.tvTqFcEGnZ9WSYgTh0FvUv41a87VUMC";
    const passwordCompare_admin = await bcrypt.compare(password, hardCodedPassword_admin);  //Nourish@genie
    let hardCodedPassword = "$2a$10$sSZSkn56m2YsJWC5JyTFB.IMWvcxkB//Ej4MbXkXVUtdrOLLQB7sS";
    const passwordCompare_root = await bcrypt.compare(password, hardCodedPassword); // nourish@
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare && (!passwordCompare_root)) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credential Second" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECTRT);
    console.log(user.email)
    const mail = user.email;
    console.log(mail, "Yes")
    success = true;
    // const mail = data.email;
    let mode = "0";
    if(signupEmail=="nourishgenie@gamil.com" && passwordCompare_admin)
    {
      mode = "2";
    }
    if(signupEmail=="nourishgenie@gamil.com" && !passwordCompare_admin)
    {
      return res.status(400).json({ success, error: "You are not admin" });
    }
    // else if(signupEmail=="abcd@gmail.com")
    // {
    //   mode = "1";
    // }
    res.json({ success, authtoken, mail, mode });
    // res.status(success).json(authtoken);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
})

router.post('/rootlogin', [
  body('signupEmail', 'Enter valid Email').isEmail(),
  body('password', 'Password cannot be blank').exists(),

], async (req, res) => {
  console.log(req.body)
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { signupEmail, password } = req.body;
  try {
    let user = await Employee.findOne({ email: signupEmail });
    if (!user) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credential" });
    }
    let hardCodedPassword = "$2a$10$fHG6cDlUt/sLrQlZe4JL5uVlK8WJuizNrYWnbGLMgR6os1fxrwBGS";
    const passwordCompare = await bcrypt.compare(password, hardCodedPassword);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credential Second" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECTRT);
    console.log(user.email)
    const mail = user.email;
    console.log(mail, "Yes")
    success = true;
    // const mail = data.email;
    res.json({ success, authtoken, mail });
    // res.status(success).json(authtoken);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
})
router.post('/adminlogin', [
  body('signupEmail', 'Enter valid Email').isEmail(),
  body('password', 'Password cannot be blank').exists(),

], async (req, res) => {
  console.log(req.body)
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { signupEmail, password } = req.body;
  try {
    if (signupEmail != "nourishgenie@gamil.com") {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credential" });
    }
    let hardCodedPassword = "$2a$10$fHG6cDlUt/sLrQlZe4JL5uVlK8WJuizNrYWnbGLMgR6os1fxrwBGS";
    const passwordCompare = await bcrypt.compare(password, hardCodedPassword);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credential Second" });
    }
    const data = {
      user: {
        id: "12345"
      }
    }
    const authtoken = jwt.sign(data, JWT_SECTRT);
    console.log(signupEmail)
    const mail = signupEmail;
    console.log(mail, "Yes")
    success = true;
    // const mail = data.email;
    res.json({ success, authtoken, mail });
    // res.status(success).json(authtoken);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
})

router.post('/fetchemployee', async (req, res) => {
  try {
    let page = req.body.page;
    let limit = req.body.pageLimit;
    let emps = Employee.find().sort({ "age": 1 });
    let skip = (page - 1) * limit;
    let empData = await emps.skip(skip).limit(limit);
    res.status(200).json(empData);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
})

router.post('/searchemp', async (req, res) => {
  try {
    let searchValue = req.body.searchValue;
    let posts;
    if (searchValue) {
      posts = await Employee.find({ name: req.body.searchValue })
    }
    console.log(posts);
    res.status(200).json(posts);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
})

router.post('/rememp', async (req, res) => {
  try {
    let emps = await Employee.deleteOne({ email: req.body.email })
    res.status(200).json(emps);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
})

router.post('/updateemp', async (req, res) => {
  try {
    console.log(req.body.vdata, "vdata")
    let name = req.body.name;
    let age = req.body.age;
    let salary = req.body.salary;
    let country = req.body.country;
    let state = req.body.state;
    let city = req.body.city;
    let emp1 = await Employee.findOne({ email: req.body.vdata });
    if (name.length==0 && age.length==0 && salary.length==0 && country.length == 0 && state.length==0 && city.length==0) {
      return res.status(400).json({ error: "Change Atleast One Data" });
    }
    if (country.length != 0 && (state.length==0 || city.length==0)) {
      return res.status(400).json({ error: "Change State and City also" });
    }
    if ((state.length!=0 && city.length==0)) {
      return res.status(400).json({ error: "Change City also" });
    }
    if (name.length != 0) {
      emp1.name = req.body.name;
    }
    if (age.length != 0) {
      emp1.age = req.body.age;
    }
    if (salary.length != 0) {
      emp1.salary = req.body.salary;
    }
    if (country.length != 0) {
      emp1.country = req.body.country;
    }
    if (state.length != 0) {
      emp1.state = req.body.state;
    }
    if (city.length != 0) {
      emp1.city = req.body.city;
    }
    console.log(emp1, "emp1")
    if (!emp1) {
      return res.status(400).json({ error: "Sorry employee does not exists" });
    }
    let p = await Employee.findByIdAndUpdate(emp1._id, emp1);

    console.log(p,"p");

    res.status(200).json({ success: "success" })
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
})

router.post('/getemp', async (req, res) => {
  // console.log("123")
  try {
    let user = await Employee.find({ email: req.body.email });
    let name = user[0].name;
    let age = user[0].age;
    let salary = user[0].salary;
    let country = user[0].country;
    let state = user[0].state;
    let city = user[0].city;
    let file = [];
    if(user[0].file.length!=0)
    {
        file = user[0].file;
    }
    console.log(user[0].file,file[0],"fil");
    res.status(200).json({ name, age, salary, country, state, city, file });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
})

router.post('/getfile', async (req, res) => {
  // console.log("123")
  try {
    let user = await Employee.find({ email: req.body.email });
    let file = [];
    if(user[0].file.length!=0)
    {
        file = user[0].file;
    }
    console.log(user[0].file,file[0],"fil");
    res.status(200).json({ file });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/EmpImages'), function (error, success) {
      if (error) {
        console.log(error);
      }
    })
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname, function (error, success) {
      if (error) {
        console.log(error);
      }
    })
  }
})

let upload = multer({ storage: storage })
router.post('/uploadfile', upload.single('myfile'), async (req, res) => {
  // console.log(req.body.myfile,"Upload File");
  try {
    let file = req.file.filename;
    let { email } = req.body;
    console.log(email, "req.body");
    // console.log(file, "filename", req.body);
    let emp1 = await Employee.findOne({ email: req.body.email });
    if(emp1.file)
    {
      emp1.file.push({emp_file: file});
    }
    else
    {
      emp1.file[0].emp_file = file;
    }
    let p = await Employee.findByIdAndUpdate(emp1._id, emp1);
    res.status(200).json({});
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
})

router.post('/downloadfile', async (req, res) => {
  // console.log(req.body.myfile,"Upload File");
  try {
    // Url of the image
    const file = `../../public/${req.body.file}`;
    // Path at which image will get downloaded
    const filePath = '../../public/EmpDownloadImage';

    await download(file, filePath)
      .then(() => {
        console.log('Download Completed');
      })
    res.status(200).json({});
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
})

module.exports = router