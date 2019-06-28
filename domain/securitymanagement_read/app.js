const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

var router = require("./router");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Swagger document definition
const options = {
	definition: {
		info: {
			version: 1.0, // Version (Req)
			title: "Security Management Read", // Title (Req)
			description: "Read API for security management"
		}
	},
	//Path to API docs
	apis: ["./router.js"]
}

//Initialize swagger-js doc
const swaggerSpec = swaggerJSDoc(options);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", router);

app.listen(process.env.PORT || 3011, () => {
	if (process.env.PORT !== undefined) {
		console.log(`Server started at "http://localhost:${process.env.PORT}/".`);
	} else {
		console.log(`Server started at "http://localhost:3011/".`);
	}
});

module.exports = app;