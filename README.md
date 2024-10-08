# Project Setup Guide ⚙️

> Make sure your MongoDB service is running before proceeding

## Setup Instructions

### 1. Install Project Dependencies 📦

You need to run to initialize ```node_module``` to project
```
npm install
```

### 2.  Insert Data into the Database 💾

After node_module is initialize to the project run this command to generate and insert the data into your database
```
npm run generate-data
```

### 3. Generate JWT Key 🔑

When it finish insert the data to database its time to run this command to generate ```JWT_KEY``` for use in login and register
```
npm run generate-env
```

## Run The Server Instructions

### Run server 🖥️

Use this command to start the server which the port of the server will be ```3000``` so you can use ```localhost:3000```
in the ```postman``` 
```
npm start