const mongoose = require('mongoose')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

// this.firstName = firstName;
// this.lastName = lastName;
// this.salary = salary;
// this.directory = [];


const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  directory: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('Employee', employeeSchema)



