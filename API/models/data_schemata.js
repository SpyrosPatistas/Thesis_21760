const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
	title: {
		type: String,
		required: true
	},
	acronym: {
		type: String,
		required: true
	},
	start_date: {
		type: Date,
		required: true
	},
	end_date: {
		type: Date,
		required: true
	},
	project_budget: {
		type: Number,
		required: true
	},
	partner_budget: {
		type: Number,
		required: true
	}, 
	employees: [{ type: Schema.Types.ObjectId, ref: 'employeeSchema' }]
});

const EmployeeSchema = Schema({	
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	birth_date: {
		type: Date,
		required: true
	},
	employee_vat: {
		type: Number,
		required: true
	},
	projects: [{ type: Schema.Types.ObjectId, ref: 'projectSchema'}]
});


const ContractSchema = Schema({
	employee: { type: Schema.Types.ObjectId, ref: 'employeeSchema', required: true },
	project: { type: Schema.Types.ObjectId, ref: 'projectSchema', required: true},
	start_date: {
		type: Date,
		required: true
	},
	end_date: {
		type: Date,
		required: true
	},
	cost: {
		type: Number,
		required: true
	},
	rate: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	}
}); 

const TotalEffortSchema = Schema ({
	contract_id: { type: Schema.Types.ObjectId, ref: 'contractSchema', required: true },
	person_hours: [{type: Number}]
});

const projectSchema = mongoose.model('projects', ProjectSchema)
const employeeSchema = mongoose.model('employees', EmployeeSchema)
const contractSchema = mongoose.model('contracts', ContractSchema)
const totaleffortSchema = mongoose.model('total_effort', TotalEffortSchema)

module.exports = { Project: projectSchema, Employee: employeeSchema, Contract: contractSchema, TotalEffort: totaleffortSchema}