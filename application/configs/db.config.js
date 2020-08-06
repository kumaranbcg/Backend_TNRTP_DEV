module.exports = {
	dbList: [
		{
			HOST: process.env.DBHOST,
			USER: process.env.DBUSERNAME,
			PASSWORD: process.env.DBPASSWORD,
			DB: process.env.DBNAME,
			dialect: "mysql",
			pool: {
				max: 5,
				min: 0,
				acquire: 30000,
				idle: 10000,
			},
			models: "application",
		},
		{
			HOST: process.env.DBHOST,
			USER: process.env.DBUSERNAME,
			PASSWORD: process.env.DBPASSWORD,
			DB: process.env.DBNAME1,
			dialect: "mysql",
			pool: {
				max: 5,
				min: 0,
				acquire: 30000,
				idle: 10000,
			},
			models: "tnrtpAuth",
		},
	],
};
