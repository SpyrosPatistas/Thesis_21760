const express = require('express')
const router = express.Router()
const { Project } = require('../models/data_schemata')
const { Employee } = require('../models/data_schemata')
const { TotalEffort } = require('../models/data_schemata')
const { Contract } = require('../models/data_schemata')

// Get all contracts
router.get('/', async (req, res) => {
	try{
		const contracts = await Contract.find()
		res.json(contracts)
	} catch (err) { 
		res.status(500).json({message: 'Error while getting the contracts!'})  //Status 500 means that it's en error on the server side and not client side 
	}
})

// Get one contract
router.get('/:id', getContract, (req, res) => {
	try{
		res.json(res.contract)
	} catch (err) {
		res.status(500).json({message: 'Error while getting the contract!'})
	}
})

// Create contract
router.post('/', async (req, res) => {
	const contract = new Contract({
		employee: req.body.employee,
		project: req.body.project,
		start_date: req.body.start_date,
		end_date: req.body.end_date,
		cost: req.body.cost,
		rate: req.body.rate,
		name: req.body.name
	})

	try {
		const newContract = await contract.save()
		res.status(201).json(newContract)	// Status 201 means successfully created
	} catch (err) {
		res.status(400).json({message: 'Error creating the contract, make sure to enter correct data!'})	// Status 400 means the error is with the user input
	}
})

// Update contract
router.patch('/:id', getContract, async (req, res) => {
	try{
		const updateOps = {}
		for(const ops of req.body) {
			// Input would be an array like: [ {"fieldName": "theField", "fieldValue": "theNewValue"}]
			updateOps[ops.fieldName] = ops.fieldValue 
		}
		Contract.updateOne({_id: req.params.id}, {$set: updateOps}).exec().then(result => {
			console.log(result)
			res.status(200).json(result)
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({error: err})
		})
	} catch (err) {
		res.status(500).json({message: 'Error updating the contract!'})
	}	
})

// Delete contract
router.delete('/:id', getContract, async (req, res) => {
	try {
		await res.contract.remove()
		res.json({message: 'Deleted Contract'})
	} catch (err) {
		res.status(500).json({message: 'Could not delete contract!'})
	}
})

// Log person hours by contract id
router.post('/:id/personhours', getContract, async (req, res) => {

	try {
		let docs = await TotalEffort.find({contract_id: req.params.id}).exec()
		// Checks if docs has anything inside, meaning the find method had a result. If it did, push the person hours in the array and save
		if (docs.length) { 
			docs[0].person_hours.push(req.body.person_hours)
			docs[0].save()
			res.status(201).json({"message": "success"})
		} else {
			// Else create a new TotalEffort object with the given contract id and the given person hours as the first element in the person hours array
			const totalEffort = new TotalEffort({
				contract_id: req.params.id, 
				person_hours: []	
			})
			const newTotalEffort = await totalEffort.save()
			newTotalEffort.person_hours.push(req.body.person_hours)
			newTotalEffort.save()
			res.status(201).json(newTotalEffort)
		}
	} catch (err) {
		res.status(400).json({message: 'Error creating the effort for the contract, make sure to enter correct data!'})
	}
}) 

// Show person hours by contract id
router.get('/:id/personhours', getContract, async (req, res) => {
	let docs = await TotalEffort.find({contract_id: req.params.id}).exec()
	// Checks if docs has anything inside, meaning the find method had a result. If it did, push the person hours in the array and save
	if (docs.length) { 
		let hours = docs[0].person_hours
			
		// This returns the array with person hours as a json object
		res.status(201).json({hours})
	} else {
		return res.status(404).json({message: 'Cannot find effort with that contract id!'})
	}
})

// Show person MONTHS by contract id
router.get('/:id/personhours/months', getContract, async (req, res) => {

	let docs = await TotalEffort.find({contract_id: req.params.id}).exec()
	// Checks if docs has anything inside, meaning the find method had a result. If it did, push the person hours in the array and save
	if (docs.length) {
		let hours = docs[0].person_hours

		
		let total = 0
		for(let i = 0; i < hours.length; i++) {
			total = total + hours[i]
		}

		// One person month is equal to 143.3 person hours
		let months = total/143.3
		// Returns the sum of the logged person months for the contract
		res.status(201).json({months})
	} else {
		return res.status(404).json({message: 'Cannot find effort with that contract id!'})
	}
})

async function getContract(req, res, next) {
	let contract
	try {
		contract = await Contract.findById(req.params.id)
		if(contract == null) {
			return res.status(404).json({message: 'Cannot find contract'})		// Status 404 means it cannot find
		}
	} catch (err) {
		return res.status(500).json({message: err.message})
	}

	res.contract = contract
	next()
}

module.exports = router