const errorCodes = require('../configs/errorCodes')
const errorMessages = require('../configs/errorMsgs')

function errorHandler(app) {
	app.use(function (err, req, res, next) {
		if (err) {
			res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({
				message: errorMessages[errorCodes.HTTP_INTERNAL_SERVER_ERROR],
			});
		} else {
			next();
		}
	});
}

module.exports = errorHandler;
