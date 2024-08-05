const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, 'values.json');

const readData = () => {
	if (fs.existsSync(filePath)) {
		const data = fs.readFileSync(filePath);
		return JSON.parse(data);
	}
	return [];
};

const writeData = (data) => {
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

app.get('/api/pairs', (req, res) => {
	const data = readData();
	res.status(200).json(data);
});

app.post('/api/pairs', (req, res) => {
	const newPairs = req.body;
	const existingPairs = readData();
	const updatedPairs = [...existingPairs, ...newPairs];
	writeData(updatedPairs);
	res.status(201).json(updatedPairs);
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
