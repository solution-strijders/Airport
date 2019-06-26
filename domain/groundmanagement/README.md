### Example service | Setting up a new service

This service will not be used for any other function then to show developers how to setup a new service

#### Steps

- First create a directory (in our case it's newApp)
- use the command `npm init` just go through all the settings, no extras required
- Add the following the `scripts` part in our package.json file

> "scripts": {
>"start": "node app.js",
>"test": "mocha ./test/**/*test.js --no-deprecation"
>},
- After adding said line run the command `npm install express --save`
- Create a app.js file, copy the contents of app.js in this folder
- Make sure to update the host port to an untaken port, make sure to note this somewhere as you'll need to use the same port in the `docker-compose.yml` file
- Then create two files a `Dockerfile` and a `.dockerignore`
- In `.dockerignore` add the following:
>node_modules 
>npm-debug.log
- Once this is done, create the dockerfile, you can just copy this from newApp itself
- In the main docker-compose file, we have to add our app.
- You can use the example compose file in newApp
- Add this under services in the main docker compose file.
- Make sure to use the port previously chosen in `app.js`

#### Done !