const fs = require("fs");
const { request } = require("http");
const crypto = require("crypto"),
	express = require("express"),
	app = express(),
	jsonParser = express.json(),
	MongoClient = require("mongodb").MongoClient,
	mongoClient = new MongoClient("mongodb+srv://admin:admin@cluster0.u6kozk6.mongodb.net/?retryWrites=true&w=majority");

let database;

(async () => {
	try {
		await mongoClient.connect();
		console.log("Database connected");
		database = mongoClient.db("Cluster0");
		app.listen(3000, () => console.log("Listening for requests on localhost:3000"));
	}
	catch(error) {
		console.log(error);
	}
})();

app.use(express.json({limit: '50mb'}));

app.use((request, response, next) => {
	console.log(`Request URL: ${request.url}`);
	next();
});

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

app.get("/script.js", (request, response) => {
    response.sendFile(__dirname + "/script.js");
});

app.post("/signUp", jsonParser, async (request, response) => {
	try {
		let email = request.body.email.toLocaleLowerCase();
		let image = request.body.image.replace(/^data:image\/jpeg;base64,/, "");
		let buffer = Buffer.from(image, "base64");
		let result = await database.collection("users").findOne({email});
		if (result) return response.send("This Email is already in use");
		else {
			fs.writeFile(`src/${email}.jpeg`, buffer, async error => {
				if (error) return response.set(500).send("error");
				await database.collection("users").insertOne({
					name: request.body.name,
					sex: request.body.sex,
					birthday: request.body.birthday,
					email,
					password: request.body.password
				});
				return response.set(200).send("success");
			});
		}
	}
	catch(error) {
		console.log(error);
		response.set(500).send("error");
	}
});

app.post("/signIn", jsonParser, async (request, response) => {
	try {
		let email = request.body.email.toLocaleLowerCase();
		let result = await database.collection("users").findOne({email, password: request.body.password});
		if (!result) return response.send({message: "Wrong email or password"});
		fs.readFile(`src/${result.email}.jpeg`, "base64", async (error, data) => {
			if (error) return response.set(500).send("error");
			return response.set(200).send({
				name: result.name,
				birthday: result.birthday,
				image: `data:image/jpeg;base64,${data}`,
				email: result.email
			});
		});
	}
	catch(error) {
		console.log(error);
		response.set(500).send("error");
	}
});

app.post("/changeName", jsonParser, async (request, response) => {
	try {
		let email = request.body.email.toLocaleLowerCase(),
			name = request.body.name;
		await database.collection("users").updateOne({email}, {$set: {name}});
		return response.set(200).send();
	}
	catch(error) {
		console.log(error);
		response.set(500).send("error");
	}
});

app.post("/changeImage", jsonParser, async (request, response) => {
	try {
		let email = request.body.email.toLocaleLowerCase();
		let image = request.body.image.replace(/^data:image\/jpeg;base64,/, "");
		let buffer = Buffer.from(image, "base64");
		fs.writeFile(`src/${email}.jpeg`, buffer, async error => {
			if (error) return response.set(500).send("error");
			return response.set(200).send();
		});
	}
	catch (error) {
		console.log(error);
		response.set(500).send("error");
	}
});

app.post("/changePassword", jsonParser, async (request, response) => {
	try {
		const [email, oldPassword, newPassword] = [request.body.email.toLocaleLowerCase(), request.body.oldPassword, request.body.newPassword];
		let result = await database.collection("users").findOne({email, password: oldPassword});
		if (!result) return response.send({message: "Wrong password"});
		await database.collection("users").updateOne({email}, {$set: {password: newPassword}});
		return response.set(200).send();
	}
	catch(error) {
		console.log(error);
		response.set(500).send("error");
	}
});

app.post("/getUsers", jsonParser, async (request, response) => {
	try {
		let email = request.body.email.toLocaleLowerCase();
		let result = await database.collection("users").find({email: {$ne: email}}).toArray();
		let counter = 0;
		(function getUserImage(email) {
			new Promise((done) => {
				fs.readFile(`src/${email}.jpeg`, "base64", (error, data) => {
					if (error) return response.set(500).send("error");
					done(`data:image/jpeg;base64,${data}`);
				});
			}).then(image => {
				result[counter].image = image;
				if (counter === result.length - 1) {
					let updResult = result.map(user => {return {image: user.image, name: user.name, age: user.birthday}});
					return response.set(200).send({data: updResult});
				}
				counter++;
				return getUserImage(result[counter].email);
			});
		})(result[counter].email);
	}
	catch(error) {
		console.log(error);
		response.set(500).send("error");
	}
});

app.use((request, response) => {
	console.log(`Bad request: ${request.url}`);
	response.set(404).send("404 NOT FOUND");
});

process.on("SIGINT", () => {
	mongoClient.close();
	console.log("Connection closed");
	process.exit();
});