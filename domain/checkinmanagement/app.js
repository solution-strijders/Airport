const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3003, () => {
	if (process.env.PORT !== undefined) {
		console.log(`Server started at "http://localhost:${process.env.PORT}/".`);
	} else {
		console.log(`Server started at "http://localhost:3003/".`);
	}
});

app.get("/", (req, res) => {
    return res.send("I am working! | CheckinManagement");
});

module.exports = app;