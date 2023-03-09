const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/createemp', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('age', 'Enter a valid age').isInt({ min: 10 }),
  body('email', 'Enter a valid email').isEmail({ min: 10 }),
  body('salary', 'Enter a valid salary').isLength({ min: 3 }),
  body('country', 'Enter a valid country').isLength({ min: 1 }),
  body('state', 'Enter a valid state').isLength({ min: 1 }),
  body('city', 'Enter a valid city').isLength({ min: 1 }),
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
    console.log("pass")
    employee = await Employee.create({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      salary: req.body.salary,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
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

router.post('/fetchemployee', async (req, res) => {
  try {
    let page = req.body.page;
    let emps = Employee.find().sort({ "age": 1 });
    const limit = 10;
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
    let emp1 = await Employee.findOne({ _id: req.body.vdata });
    emp1.salary = req.body.salary;
    console.log(emp1)
    if (!emp1) {
      return res.status(400).json({ error: "Sorry employee does not exists" });
    }
    let p = await Employee.findByIdAndUpdate(req.body.vdata, emp1);

    res.status(200).json({ success: "success" })
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
})

module.exports = router