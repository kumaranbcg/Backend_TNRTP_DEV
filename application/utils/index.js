const bcrypt = require("bcrypt");
const errorCodes = require("../configs/errorCodes");
const errorMessages = require("../configs/errorMsgs");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.AES_KEY);
module.exports = {
	errorHandler: require("./errorHandler"),
	generateOtp: function (data) {
		var chars = "0123456789",
			result = "";
		for (var i = data; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
		return result;
	},
	generatePassword: function (data) {
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrtsuvwxyz",
			result = "";
		for (var i = data; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
		return result;
	},
	genHash: function (data) {
		let salt = bcrypt.genSaltSync(8);
		return bcrypt.hashSync(data, salt);
	},
	generateUserId: function (data) {
		var chars = "0123456789",
			result = "";
		for (var i = data; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
		return result;
	},
	verifyToken: require("./verifyToken"),
	hasRole: function (role) {
		return function (req, res, next) {
			if (!role.includes(req.user.role)) {
				return res
					.status(errorCodes.HTTP_UNAUTHORIZED)
					.json({ errMessage: errorMessages[errorCodes.HTTP_UNAUTHORIZED] });
			} else next();
		};
	},
	decryptData: async (req, res, next) => {
		if (req.body) req.body = JSON.parse(cryptr.decrypt(req.body));
		next();
	},
	encryptData: function (data) {
		return cryptr.encrypt(JSON.stringify(data));
	},
	docUpload: require("./docUpload"),
};
