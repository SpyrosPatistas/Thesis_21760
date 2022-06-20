const express = require('express')
const router = express.Router()
const { Project } = require('../models/data_schemata')
const { Employee } = require('../models/data_schemata')

// Get all projects
router.get('/', async (req, res) => {
	try{
		const projects = await Project.find()
		res.json(projects)
	} catch (err) { 
		res.status(500).json({message: 'Error while getting the projects!'})  //Status 500 means that it's en error on the server side and not client side 
	}
})

// Get one project's details by id
router.get('/:id', getProject, (req, res) => {
	try{
		res.json(res.project)
	} catch (err) {
		res.status(500).json({message: 'Error while getting the project!'})
	}
})

// Create project
router.post('/', async (req, res) => {
	const project = new Project({
	title: req.body.title,
	acronym: req.body.acronym,
	start_date: req.body.start_date,
	end_date: req.body.end_date,
	project_budget: req.body.project_budget,
	partner_budget: req.body.partner_budget,
	employees: []
	})
	try {
		const newProject = await project.save()
		res.status(201).json(newProject)		// Result sends status 201 and shows the created record. Status 201 means successfully created an object
	} catch (err) {
		res.status(400).json({message: 'Error creating the project, make sure to enter correct data!'})	// Status 400 means the error is with the user input
	}
})

// Update project
router.patch('/:id', getProject, async (req, res) => {
	try{
		const updateOps = {}
		for(const ops of req.body) {
			// Input would be an array like: [ {"fieldName": "theField", "fieldValue": "theNewValue"}]
			updateOps[ops.fieldName] = ops.fieldValue 
		}
		Project.updateOne({_id: req.params.id}, {$set: updateOps}).exec().then(result => {
			console.log(result)
			res.status(200).json(result)
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({error: err})
		})
	} catch (err) {
		res.status(500).json({message: 'Error updating the project!'})
	}

})

// Delete project
router.delete('/:id', getProject, async (req, res) => {
	try {
		await res.project.remove()
		res.json({message: 'Deleted Project'})
	} catch (err) {
		res.status(500).json({message: 'Could not delete project!'})
	}
})

// Find project by id
async function getProject(req, res, next) {
	let project
	try {
		project = await Project.findById(req.params.id)
		if(project == null) {
			return res.status(404).json({message: 'Cannot find project'})	// Status 404 means it cannot find it
		}
	} catch (err) {
		return res.status(500).json({message: err.message})
	}

	res.project = project
	next()
}

module.exports = router