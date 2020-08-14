const service = require("./../services/dashboard.service");
const errorCodes = require("./../configs/errorCodes");
const errMessages = require("./../configs/errorMsgs");
const { PC_FORM_MASTER_STATUS, PC_FORM_STAGE } = require("./../constants/index");
class DashboardController {}

/**
 * DESC : Admin dashboard statistics
 * @param int/string
 * @return : array/json
 */
DashboardController.prototype.dashboardStatistics = async (req, res) => {
	try {
		let result = await service.dashboardStatisticService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		console.log(err);
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
module.exports = new DashboardController();
