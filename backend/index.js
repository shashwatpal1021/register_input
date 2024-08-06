const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, 'values.json');
const readData = (page, limit) => {
	if (fs.existsSync(filePath)) {
		let data = JSON.parse(fs.readFileSync(filePath));
		console.log("data--->", data)
		return data;
	}
	return [];
};

const paginate = (array, page, limit) => {
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	return array.slice(startIndex, endIndex);
};

const writeData = (data) => {
	fs.writeFileSync(filePath, JSON.stringify(data, 3, null));
};

app.get('/api/pairs', (req, res) => {
	const { page, limit } = req.query;  // Default to page 1, limit 10
	const data = readData(parseInt(page), parseInt(limit));
	const paginatedData = paginate(data, parseInt(page), parseInt(limit));
	res.status(200).json({
		page: parseInt(page),
		limit: parseInt(limit),
		total: data.length,
		data: paginatedData
	});
});

app.post('/api/pairs', (req, res) => {
	let newpairs = req.body
	newpairs.map((data) => {
		data.id = Math.floor(Math.random() * 1000).toString()
	})
	console.log("newpairs-->", newpairs)

	const existingPairs = readData();
	console.log("existingPairs-->", existingPairs)
	const updatedPairs = [...existingPairs, ...newpairs];
	console.log("updatedPairs-->", updatedPairs)
	writeData(updatedPairs);
	res.status(201).json(updatedPairs);
});

app.put('/api/pairs/:id', (req, res) => {
	const { id } = req.params;
	const { name, value } = req.body;
	const existingPairs = readData();
	const updatedPairs = existingPairs.map((pair) => {
		if (pair.id == id) {
			return { ...pair, name, value };
		}
		return pair;
	});
	writeData(updatedPairs);
	res.status(200).json(updatedPairs);
});


app.listen(port, () => { // Starting the server and listening on the specified port
	console.log(`Server running at http://localhost:${port}`); // Logging the server URL
});

