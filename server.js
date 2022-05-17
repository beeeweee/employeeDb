const express = require('express')
const mongoose = require('mongoose')
const Employee = require('./models/employee')

//importing articleRouter so you have access to it
const employeeRouter = require('./routes/employees')
const methodOverride = require('method-override')
const app = express()

//mongo DB connection/name
mongoose.connect('mongodb://localhost/employee' )

//view engine
app.set('view engine', 'ejs')
//access all the different parameters through article route by using req.body
app.use(express.urlencoded({ extended: false }))

//param _method will override
app.use(methodOverride('_method'))

//index route - 
app.get('/', async (req, res) => {
  const employees = await Employee.find().sort({ createdAt: 'desc' })
  res.render('employees/index', { employees: employees })
})

app.use('/employees', employeeRouter)

app.listen(5000)