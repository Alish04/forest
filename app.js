const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const app = express();
const port = 3000;
const path = require("path");
// Подключение к базе данных
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

db.connect((err) => {
	if (err) {
		console.error("Ошибка подключения к базе данных:", err);
		throw err;
	}
	console.log("Успешное подключение к базе данных MySQL");
});

// Middleware
app.use(express.static(path.join(__dirname, "ready-html")));
app.use(bodyParser.urlencoded({ extended: false }));

// Маршруты
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "ready-html", "index.html"));
});

app.get("/register", (req, res) => {
	res.sendFile(path.join(__dirname, "ready-html", "register.html"));
});

app.post("/register", (req, res) => {
	const { firstname, lastname, email, userPassword, confirmPass } = req.body;

	// Валидация данных
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send(errors.array());
	}

	// Проверка наличия пользователя с такой почтой
	db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
		if (err) {
			console.error("Ошибка при выполнении SQL-запроса:", err);
			return res.status(500).send("Внутренняя ошибка сервера");
		}

		if (results.length > 0) {
			return res.status(400).send("Пользователь с такой почтой уже существует");
		}

		// Проверка пароля
		if (userPassword.length < 8 || !/[A-Z]/.test(userPassword) || !/\d/.test(userPassword)) {
			return res.status(400).send("Пароль должен содержать минимум 8 символов, включая заглавные буквы и цифры.");
		}

		// Проверка совпадения пароля
		if (userPassword !== confirmPass) {
			return res.status(400).send("Пароль и подтверждение пароля не совпадают");
		}

		// Хеширование пароля
		const hashedPassword = await bcrypt.hash(userPassword, 10);

		// Создание нового пользователя
		db.query("INSERT INTO users (firstName, lastName, email, userPassword) VALUES (?, ?, ?, ?)", [firstname, lastname, email, hashedPassword], (err) => {
			if (err) {
				console.error("Ошибка при вставке данных в базу данных:", err);
				return res.status(500).send("Ошибка регистрации");
			}
			res.status(201).redirect("/signin"); // Используйте редирект здесь
		});
	});
});

app.get("/signin", (req, res) => {
	res.sendFile(path.join(__dirname, "ready-html", "login.html"));
});

app.post("/signin", (req, res) => {
	const { email, userPassword } = req.body;

	// Поиск пользователя по email
	db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
		if (err) {
			console.error("Ошибка при выполнении SQL-запроса:", err);
			return res.status(500).send("Внутренняя ошибка сервера");
		}

		if (results.length === 0) {
			// Пользователь не найден
			return res.status(401).send("Пользователь с таким email не найден.");
		}

		const user = results[0];

		// Сравнение паролей
		const isPasswordCorrect = await bcrypt.compare(req.body.userPassword, user.userPassword);

		if (isPasswordCorrect) {
			// Если пароль совпадает
			res.redirect("/lessons.html"); // Redirect to main page (временный вариант)
		} else {
			// Если пароль не совпадает
			res.status(401).send("Неверный пароль.");
		}
	});
});

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`);
});
