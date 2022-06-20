# How to get the source code
### If the user has git installed in their local machine:
Open Git Bash.
Navigate into the location where the source code will be cloned.
Run 'git clone https://github.com/dithua/Thesis_21760.git' to get the source code.

### The user can also download the files in a zip and unzip it to get the source code.

# Requirements to run the app
### Personal preferences will be stated due to the app being developed with those tools.
User must have a local MongoDB database installed, version v5.0.2 (preferred).
User must have Node.js installed, version v14.17.0 (preferred).
User must have vue cli installed, version 4.5.13 (preferred).

### To run back-end
Open terminal.
Navigate into the API folder of the app.
Run 'npm install'.
Run 'npm start', connection will succeed after getting a message of the server started and database connected.
Keep terminal open to maintain the connection.

### To run front-end
Open second terminal.
Navigate into the client folder of the app.
Run 'npm install'. This might take a bit of time.
Run 'npm run serve' to compile and run the application. It hot-reloads for development.
Should need a little bit of time to build all modules, will say DONE and inform where the app is running.
Keep terminal open to maintain connection.

### Access the app
Keep both terminals open after running their respective commands.
With both back-end and front-end running, go to http://localhost:8080 to access the app.
