const express = require('express')
//importing model for schema
const Employee = require('../models/employee')
//router used to create views ex - .get but through the router ex router.get('/')
const router = express.Router()

//routing to /new - creates new article
router.get('/new', (req, res) => {
  //1st param = path for file, 2nd param = passsing in any object
  res.render('Employees/new', { employee: new Employee() })
})

router.get('/edit/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id)
  res.render('employees/edit', { employee: employee })
})

//shows employee by ID
router.get('/salary', async (req, res) => {
  const employee = await Employee.aggregate([{$group: { 
    _id: null,
     totalValue: {$sum: "$salary"}
    }
  }
    ])
  console.log(employee)
  
  res.render('/', { employee: employee })
})

//shows employee by ID
router.get('/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id )
  if (employee == null) res.redirect('/')
  res.render('employees/show', { employee: employee })
})

//
router.post('/', async (req, res, next) => {
  req.employee = new Employee()
  next()
}, saveEmployeeAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.employee = await Employee.findById(req.params.id)
  next()
}, saveEmployeeAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveEmployeeAndRedirect(path) {
  return async (req, res) => {
    let employee = req.employee
    employee.firstName = req.body.firstName
    employee.lastName = req.body.lastName
    employee.salary = req.body.salary
    employee.directory = req.body.directory[0]
    if(employee.directory === null){
      employee.directory = 'None'
    }
    try {
      employee = await employee.save()
      res.redirect(`/employees/${employee.id}`)
    } catch (e) {
      res.render(`employees/${path}`, { employee: employee })
    }
  }
}

function sumAllSalarys(path) {
  return async (req, res) => {
    let employee = req.employee
    console.log(employee)
    let sumOfAllSalarys = 0;
    employees.forEach(employee => {
      sumOfAllSalarys = employee.salary+sumOfAllSalarys
    })
    employee.salary = req.body.salary
    if(employee.directory === null){
      employee.directory = 'None'
    }
    try {
      employee = await employee.save()
      res.render(`/', ${sumOfAllSalarys}`)
    } catch (e) {
      res.render(`/`, { employee: employee })
    }
  }
}

//whenever you require this file, you can read it
module.exports = router