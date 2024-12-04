// eslint-disable-next-line
const fs = require('fs');
// eslint-disable-next-line
const jsonServer = require('json-server');
// eslint-disable-next-line
const jwt = require('jsonwebtoken');
// eslint-disable-next-line
const path = require('path');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(async (req, res, next) => {
	await new Promise((res) => {
		setTimeout(res, 800);
	});
	next();
});

server.use((req, res, next) => {
	if (!req.headers.authorization) {
		console.log('sdfsdfsdsdfsdfsd');
		return res.status(403).json({ message: 'AUTH ERROR' });
	}
	next();
});

// server.use(jsonServer.defaults());
server.use(router);

server.post('/login', (req, res) => {
	const { username, password } = req.body;
	const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
	const { users } = db;

	const userFromBd = users.find(
		(u) => u.username === username && u.password === password,
	);
	if (userFromBd) {
		return res.json(userFromBd);
	}

	return res.status(403).json({ message: 'Unauthorized error' });
});

server.listen(8000, () => {
	console.log('Server started on port 8000');
	console.log('http://localhost:8000/');
});
