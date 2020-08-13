const { dbList } = require("./../configs/db.config.js");
const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const basename = path.basename(module.filename);
let db = {};
dbList.forEach((database) => {
	db[database.models] = new Sequelize(database.DB, database.USER, database.PASSWORD, {
		host: database.HOST,
		dialect: database.dialect,
		operatorsAliases: 0,
		logging: false,
		pool: {
			max: database.pool.max,
			min: database.pool.min,
			acquire: database.pool.acquire,
			idle: database.pool.idle,
		},
		dialectOptions: {
			multipleStatements: true,
		},
	});

	fs.readdirSync(__dirname + "/" + database.models)
		.filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
		.forEach((file) => {
			const model = db[database.models].import(path.join(__dirname + "/" + database.models, file));
			db[file.split(".")[0]] = model;
			// db[file.split(".")[0]] = require("../models/" + database.models + "/" + file)(
			// 	sequelize,
			// 	Sequelize
			// );
		});
});
Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

module.exports = db;
