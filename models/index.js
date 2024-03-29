var path = require('path');

// Cargar ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
//    DATABASE_URL = sqlite:///
//    DATABASE_STORAGE = quiz.sqlite

var url, storage;

if (!process.env.DATABASE_URL) {
    url = "sqlite:///";
    storage = "quiz.sqlite";
} else {
    url = process.env.DATABASE_URL;
    storage = process.env.DATABASE_STORAGE || "";
}

var sequelize = new Sequelize(url,{
	storage: storage,
	omitNull: true 
});
// Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
        // Ya se han creado las tablas necesarias.
	return Quiz.count().then(function (c) {
	if (c === 0) {   // la tabla se inicializa solo si está vacía
		return Quiz.create({ 
			question: 'Capital de Italia',answer: 'Roma'
          	}).then(function() {
			console.log('Base de datos inicializada con datos');
		});
        }
});
}).catch(function(error) {
        console.log("Error Sincronizando las tablas de la BBDD:", error);
        process.exit(1);
    });


exports.Quiz = Quiz; // exportar definición de tabla Quiz
