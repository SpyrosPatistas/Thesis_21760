const express = require('express');

const app = express();

const mongoose = require('mongoose');

const cors = require('cors');

//require('dotenv/config'); //To hide information on how to connect to db with the process.env.DB_CONNECTION later, only for connection to cloud

var corsOptions = {
	origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// Local database url
const url = 'mongodb://localhost:27017/myDatabase'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('Connection error:', err)
})

app.use(express.json())

const projectRouter = require('./routes/projectsummary')
app.use('/projectsummary', projectRouter)

const employeeRouter = require('./routes/employeesummary')
app.use('/employeesummary', employeeRouter)

const contractRouter = require('./routes/contractsummary')
app.use('/contractsummary', contractRouter)

//How the server starts listening
app.listen(3000, () => console.log('Server started')) 

//Connect to Database CLOUD (MongoDB Atlas)
//mongoose.connect('mongodb+srv://admin:12345@thesiscluster.fg0kh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true}, 
	//() => console.log('Connected to DB!'))