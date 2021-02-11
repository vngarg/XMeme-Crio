# <div align="center">XMeme</div>

XMeme is CRUD application that can be used to display memes from any third party website at one single place. As this is CRUD application, so you can add, update, delete and get all the memes. 
This is the backend part of the application.

### Requirements
You'll require 2 environment variables to be created for the server to work properly. 
```
PORT: 8080
```
```
MONGO_URI: 
```
- MONGO_URI contains the connection string to your database. 

### Project Setup
- Run the below commands to start the server on your local device. 
```
npm install
node server.js
```
- If the environment variables are correctly set up, then this will run the application on PORT 8080.

### Dependencies

- `cors: ^2.8.5` - Used to bypass the CORS issue.
- `dotenv: ^8.2.0` - Used for the creation and usage of .env file.
- `express: ^4.17.1`
- `mongoose: ^5.11.15` - used to work with MongoDb
- `morgan: ^1.10.0` - used to get the logs of the http requests
- `uuid: ^8.3.2` - used to create a unique id for each meme.

### TODO
- [ ] Add Comments in back end & front end
- [ ] Search meme by id banana h frontend p
- [ ] Add date & time of creation of meme.