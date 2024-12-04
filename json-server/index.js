const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

// Добавление парсинга JSON
server.use(jsonServer.bodyParser);

server.use(async (req, res, next) => {
	await new Promise((resolve) => {
		setTimeout(resolve, 800); // Имитация задержки
	});
	next();
});

// Обработка маршрута /login
server.post('/login', (req, res) => {
	const { username, password } = req.body;

	// Загрузка базы данных
	const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
	const { users } = db;

	// Поиск пользователя в базе данных
	const userFromBd = users.find(
		(u) => u.username === username && u.password === password,
	);

	if (userFromBd) {
		return res.json(userFromBd); // Возврат данных пользователя
	}

	return res.status(400).json({ message: 'Authorization error' }); // Ошибка аутентификации
});

// Middleware для авторизации
server.use((req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}
	next();
});

// Подключение роутера после кастомных маршрутов
server.use(jsonServer.defaults());
server.use(router);

server.listen(8000, () => {
	console.log('Server started on port 8000');
	console.log('http://localhost:8000/');
});
