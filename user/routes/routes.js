const express = require("express");
const messages = require("./../configs/errorMsgs.js");
const ErrorCodes = require("./../configs/errorCodes.js");
const Auth = require("./../utils/index");
const router = express.Router();
const { STAFF_ROLE } = require("../constants/index");
let {
	AuthController,
	OtpController,
	RegistrationController,
	AdminController,
} = require("./../controllers/controller.js");

router.use((req, res, next) => {
	if (req.headers.authorization) {
		let token = req.headers.authorization.replace("Bearer ", "");
		if (token == process.env.API_AUTH_KEY) {
			next();
		} else {
			let Error = new Error();
			next(Error);
		}
	}
});

router.use((err, req, res, next) => {
	if (err) {
		res
			.status(ErrorCodes.HTTP_UNAUTHORIZED)
			.json({ message: messages[ErrorCodes.HTTP_UNAUTHORIZED] });
	} else {
		next();
	}
});

module.exports = router;
