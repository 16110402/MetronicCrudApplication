const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

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
      console.log(msg1,"eroooo");
      return res.status(400).json({ errors: msg1, error: "401" });
    }
    // Check whether the user with this employee exists already
    let employee = await Employee.findOne({ email: req.body.email });
    if (employee) {
      return res.status(400).json({ error: "404" });
    }
    // Create a new Employee
    if(req.body.password!=req.body.confirmpassword)
    {
        return res.status(400).json({error: "Sorry! Password is not matched"});
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
  body('signupEmail','Enter valid Email').isEmail(),
  body('password','Password cannot be blank').exists(),
  
] , async (req, res)=>{
      console.log(req.body)
      let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

const {signupEmail, password} = req.body;
try{
    let user = await Employee.findOne({email: signupEmail});
    if(!user){
      success = false
      return res.status(400).json({success, error: "Please try to login with correct credential"});
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare)
    {
      success = false
      return res.status(400).json({success, error: "Please try to login with correct credential Second"});
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECTRT);
    console.log(user.email)
    const mail = user.email;
    console.log(mail,"Yes")
    success = true;
    // const mail = data.email;
    res.json({success, authtoken,mail});
    // res.status(success).json(authtoken);
} catch(error){
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
    if(searchValue)
    {
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
    // if(state.length!=0 && (country==emp1.country || country.length==0))
    // {
    //   return res.status(400).json({ errors: "change country first", error: "401" });
    // }
    // if(city.length!=0 && (state==emp1.state || state.length==0 || country==emp1.country || country.length==0))
    // {
    //   return res.status(400).json({ errors: "change country and state first", error: "401" });
    // }
    if(name.length!=0)
    {
      emp1.name = req.body.name;
    }
    if(age.length!=0)
    {
      emp1.age = req.body.age;
    }
    if(salary.length!=0)
    {
      emp1.salary = req.body.salary;
    }
    if(country.length!=0)
    {
      emp1.country = req.body.country;
    }
    if(state.length!=0)
    {
      emp1.state = req.body.state;
    }
    if(city.length!=0)
    {
      emp1.city = req.body.city;
    }
    console.log(emp1,"emp1")
    if (!emp1) {
      return res.status(400).json({ error: "Sorry employee does not exists" });
    }
    let p = await Employee.findByIdAndUpdate(emp1._id, emp1);

    res.status(200).json({ success: "success" })
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
})

router.post('/getemp', async (req, res) => {
  console.log("123")
  try{
  let user = await Employee.find({email: req.body.email});
  let name = user[0].name;
  let age = user[0].age;
  let salary = user[0].salary;
  let country = user[0].country;
  let state = user[0].state;
  let city = user[0].city;

  res.status(200).json({name, age, salary, country, state, city});
  }
  catch(error){
         console.error(error.message);
         res.status(500).send("internal server Error occured");
       }
})


module.exports = router