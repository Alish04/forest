const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const path = require ('path' );


app.use (express.static (path.join(__dirname, 'ready-html' )));

app.use(bodyParser.urlencoded({ extended: false }));

const db = mysql.createConnection({
	host: "localhost",
	user: "root", // Ваш пользователь MySQL
	password: "Alish_2002", // Ваш пароль MySQL
	database: "web",
});

db.connect((err) => {
	if (err) {
		console.error("Ошибка подключения к базе данных:", err);
		throw err;
	}
	console.log("Успешное подключение к базе данных MySQL");
});

db.query(`CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	firstname VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	userPassword VARCHAR(255) NOT NULL
	)`, (err) => {
	if (err) {
		console.error("Ошибка создания таблицы пользователей:", err);
		throw err;
	}
	console.log("Таблица пользователей создана или уже существует");
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "ready-html", "index.html"));
});

app.get("/register", (req, res) => {
	res.sendFile(path.join(__dirname, "ready-html", "register.html"));
});

app.post("/register", (req, res) => {
	const { firstname, lastname, email, userPassword, confirmPass } = req.body;

	// Проверка наличия пользователя с такой почтой
	db.query("select * from web.users where email = ?", [email], (err, results) => {
		if (userPassword.length < 8 || !/[A-Z]/.test(userPassword) || !/\d/.test(userPassword)) {
			return res.status(400).send("Пароль должен содержать минимум 8 символов, включая заглавные буквы и цифры.");
		}

		if (err) {
			console.error("Ошибка при запросе к базе данных:", err);
			return res.status(500).send("Ошибка регистрации");
		}

		if (results.length > 0) {
			return res.status(400).send("Пользователь с такой почтой уже существует");
		}

		// Проверка совпадения пароля и подтверждения пароля
		if (userPassword !== confirmPass) {
			return res.status(400).send("Пароль и подтверждение пароля не совпадают");
		}

		// Создание нового пользователя
		db.query("insert into web.users (firstName, lastName, email, userPassword) values (?, ?, ?, ?)", [firstname, lastname, email, userPassword], (err) => {
			if (err) {
				console.error("Ошибка при вставке данных в базу данных:", err);
				return res.status(500).send("Ошибка регистрации");
			}
			res.status(201).redirect("/signin"); // Используйте редирект здесь
		});
	});
});


app.get("/signin", (req, res) => {
	res.sendFile(path.join(__dirname, "ready-html", "login.html"));// Замените путь на путь к вашей странице входа
});

// Роут для обработки входа (POST-запрос)
app.post("/signin", (req, res) => {
	const { email, userPassword } = req.body;

	// Поиск пользователя по email
	db.query("select * from web.users where email = ?", [email], (err, results) => {
		if (err) {
			console.error("Ошибка при выполнении SQL-запроса:", err);
			return res.status(500).send("Внутренняя ошибка сервера");
		}

		if (results.length === 0) {
			// Пользователь не найден
			return res.status(401).send("Пользователь с таким email не найден.");
		}

		const user = results[0];

		if (user.userPassword === userPassword) {
			// If password matches
			res.redirect("/main.html"); // Redirect to main page
		} else {
			// If password does not match
			res.status(401).send("Неверный пароль.");
		}

	});
});


app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`);
});
