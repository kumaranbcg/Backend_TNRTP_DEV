const dbConfig = require("./../configs/db.config.js");
const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const basename = path.basename(module.filename);
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: 0,
	logging: false,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
	dialectOptions: {
		multipleStatements: true,
	},
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
fs.readdirSync(__dirname)
	.filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
	.forEach((file) => {
		db[file.split(".")[0]] = require("./" + file)(sequelize, Sequelize);
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});
module.exports = db;
