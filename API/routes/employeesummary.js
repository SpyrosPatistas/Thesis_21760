const express = require('express')
const router = express.Router()
const { Project } = require('../models/data_schemata')
const { Employee } = require('../models/data_schemata')

// Get all employees
router.get('/', async (req, res) => {
	try{
		const employees = await Employee.find()
		res.json(employees)
	} catch (err) { 
		res.status(500).json({message: 'Error while getting the employees!'})  //Status 500 means that it's en error on the server side and not client side 
	}
})

// Get employee by id
router.get('/:id', getEmployee, (req, res) => {
	try{
		res.json(res.employee)
	} catch (err) {
		res.status(500).json({message: 'Error while getting the employee!'})
	}
})

// Create employee
router.post('/', async (req, res) => {
	const employee = new Employee({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		birth_date: req.body.birth_date,
		employee_vat: req.body.employee_vat,
		projects: []
	})

	try {
		const newEmployee = await employee.save()
		res.status(201).json(newEmployee)		// Status 201 means successfully created
	} catch (err) {
		res.status(400).json({message: 'Error creating the employee, make sure to enter correct data!'})	// Status 400 means the error is with the user input
	}
})

// Update employee
router.patch('/:id', getEmployee, async (req, res) => {
	try{
		const updateOps = {}
		for(const ops of req.body) {
			// Input would be an array like: [ {"fieldName": "theField", "fieldValue": "theNewValue"}]
			updateOps[ops.fieldName] = ops.fieldValue 
		}
		Employee.updateOne({_id: req.params.id}, {$set: updateOps}).exec().then(result => {
			console.log(result)
			res.status(200).json(result)
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({error: err})
		})
		} catch (err) {
			res.status(500).json({message: 'Error updating the employee!'})
	}	
})

// Delete employee
router.delete('/:id', getEmployee, async (req, res) => {
	try {
		await res.employee.remove()
		res.json({message: 'Deleted Employee'})
	} catch (err) {
		res.status(500).json({message: 'Could not delete employee!'})
	}
})

// Search employee by last name or VAT number
router.get('/search/:search_criteria', async (req, res) => {
	try{
		// Will return all employees with the last name given, CASE SENSITIVE
		const employees = await Employee.find()
		// Filter looks at all elements in employees and returns in results all employees that satisfy the parameter (either the last name or vat number given)
		let result = await employees.filter((employee) => employee.last_name === req.params.search_criteria || employee.employee_vat === Number(req.params.search_criteria))
		if(result.length > 0 ) {
			res.json(result)
		} else {
			res.status(400).json({message: 'Employee with this last name or VAT number does not exist'})
		}
	} catch (err) {
		res.status(500).json({message: err.message})
	}
})

// Get employee by id
async function getEmployee(req, res, next) {
	let employee
	try {
		employee = await Employee.findById(req.params.id)
		if(employee == null) {
			return res.status(404).json({message: 'Cannot find employee'})		// Status 404 means it cannot find
		}
	} catch (err) {
		return res.status(500).json({message: err.message})
	}

	res.employee = employee
	next()
}

module.exports = router